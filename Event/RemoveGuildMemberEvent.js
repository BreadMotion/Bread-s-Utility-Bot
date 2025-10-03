/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**メンバー参加イベント
 * @type {EventModule} */
const event = {
  data: { name: "guildMemberRemove" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.GuildMemberRemove, async (member) => {
      const reply = await botManager.SendMessageToTalkChannel(
        `${member.user.username}がチャンネルから退場しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};

module.exports = event;
