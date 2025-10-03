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
 * @type {EventModule}*/
const event = {
  data: { name: "GuildMemberAdd" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.GuildMemberAdd, async (member) => {
      const reply = await botManager.SendMessageToTalkChannel(
        `${member.user.username}が参加しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};

module.exports = event;
