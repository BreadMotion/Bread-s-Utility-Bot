/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { EmbedBuilder, Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**スレッド作成イベント
 * @type {EventModule} */
const event = {
  data: { name: "EvtCreateThread" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.ThreadCreate, async (thread) => {
      const user = await botManager.Client.users.fetch(thread.ownerId);
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
      const reply = await botManager.SendMessageToTalkChannel(
        thread.guild.id,
        embed
      );
      await reply.react("👀");
    });
  },
};

module.exports = event;
