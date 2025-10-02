/**
 * メンバー参加通知イベント
 */
const { Events } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const { BotManager } = require("../Class/BotManager");
/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

module.exports = {
  /**イベント名*/
  data: { name: "GuildMemberAdd" },
  /**イベント
   * @param {BotManager} botManagerInstance*/
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.GuildMemberAdd, async (member) => {
      console.log("call : guildMemberAdd Event");
      const reply = botManager.SendMessageToTalkChannel(
        `${member.user.username}が参加しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};
