/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { EmbedBuilder, AuditLogEvent, Client, Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**スレッド更新イベント
 * @type {EventModule} */
const event = {
  data: { name: "EvtUpdateThread" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.ThreadUpdate, async (oldThread, newThread) => {
      const user = await botManager.Client.users.fetch(newThread.ownerId);
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
          { name: "タイトル", value: `${newThread}`, inline: true },
          { name: "投稿者", value: `${user}`, inline: true },
          { name: "更新者", value: `${log.executor}`, inline: true },
          { name: "チャンネル", value: `${newThread.parent}`, inline: true },
        ])
        .setFooter({ text: "Call ThreadUpdateEvent" })
        .setTimestamp()
        .setColor("#2bff67");
      const reply = await botManager.SendMessageToTalkChannel(
        newThread.guild.id,
        embed
      );
      await reply.react("👀");
    });
  },
};

module.exports = event;
