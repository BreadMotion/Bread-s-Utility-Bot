const { Client, EmbedBuilder, Events } = require("discord.js");
const config = require("../Data/config.json");
let botManager = null;

module.exports = {
  data: { name: "ThreadCreateEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.ThreadCreate, async (thread) => {
      // ドキュメント投稿
      const user = await botManager.Client.users.fetch(thread.ownerId);
      const channel = botManager.Client.channels.cache.get(
        config.TokeChannelID
      );
      const embed = new EmbedBuilder()
        .setTitle("フォーラム通知")
        .setDescription("新規スレッドが投稿されました！" + "👏")
        .setFields([
          { name: "タイトル", value: `${thread}` },
          { name: "投稿者", value: `${user}`, inline: true },
          { name: "チャンネル", value: `${thread.parent}`, inline: true },
        ])
        .setFooter({ text: "Call ThreadCreateEvent" })
        .setTimestamp()
        .setColor("#2bff67");
      const reply = await channel.send({ embeds: [embed] });
      await reply.react("👀");
    });
  },
};
