const { EmbedBuilder, AuditLogEvent, Client, Events } = require("discord.js");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

// TODO: イベント検知していない
module.exports = {
  data: { name: "ThreadUpdateEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.on(Events.ThreadUpdate, async (oldThread, newThread) => {
      // ドキュメント投稿
      const config = require("../Data/config.json");
      const user = await clientSrc.users.fetch(newThread.ownerId);
      const channel = clientSrc.channels.cache.get(config.TokeChannelID);
      let reportContent = "";

      if (
        oldThread.locked === newThread.locked &&
        oldThread.archived === newThread.archived
      )
        return;

      if (!oldThread.locked && newThread.locked)
        reportContent = "スレッドがロックされました！";
      else if (oldThread.locked && !newThread.locked)
        reportContent = "スレッドがアンロックされました！";
      else if (!oldThread.archived && newThread.archived)
        reportContent = "スレッドがアーカイブされました！";
      else if (oldThread.archived && !newThread.archived)
        reportContent = "スレッドがアンアーカイブされました！";

      const fetchedLogs = await newThread.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.ThreadUpdate,
      });

      const log = fetchedLogs.entries.first();
      const embed = new EmbedBuilder()
        .setTitle("フォーラム通知")
        .setDescription(reportContent + "👏")
        .setFields([
          { name: "タイトル", value: `${newThread}`, intline: true },
          { name: "投稿者", value: `${user}`, inline: true },
          { name: "更新者", value: `${log.executor}`, intline: true },
          { name: "チャンネル", value: `${newThread.parent}`, intline: true },
        ])
        .setFooter({ text: "Call ThreadUpdateEvent" })
        .setTimestamp()
        .setColor("#2bff67");
      const reply = await channel.send({ embeds: [embed] });
      await reply.react("👀");
    });
  },
};
