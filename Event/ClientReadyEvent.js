/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 * @typedef {import('discord.js').Client} Client
 */
const { Events } = require("discord.js");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**起動イベント
 * @type {EventModule}*/
const event = {
  data: { name: "clientReady" },
  /** ボットマネージャーのインスタンス
   * @param {BotManager} botManagerInstance*/
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    /**@param {Client} _*/
    botManager.Client.once(Events.ClientReady, async (_) => {
      console.log("起動処理を開始します。");
      await botManager.RegistCommand();
      await botManager.SetPresence("開発", "online");
      console.log("起動しました。");
      botManager.GetTalkChannel.send("ただいま！");
    });
  },
};
module.exports = event;
