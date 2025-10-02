/**
 * @typedef {import('discord.js').Client} Client
 */
const { Events } = require("discord.js");
const { BotManager } = require("../Class/BotManager");
/**@type {BotManager}*/
let botManager = null;

// 起動処理イベント
module.exports = {
  data: { name: "clientReady" },
  /** ボットマネージャーのインスタンス
   * @param {BotManager} botManagerInstance*/
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    /**@param {Client<Boolean>} _*/
    botManager.Client.once(Events.ClientReady, async (_) => {
      console.log("起動処理を開始します。");
      await botManager.RegistCommand();
      await botManager.SetPresence("開発", "Online");
      console.log("起動しました。");
      botManager.GetTalkChannel.send("ただいま！");
    });
  },
};
