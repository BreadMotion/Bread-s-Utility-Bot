/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**メンバー退出イベント
 * @type {EventModule}*/
const event = {
  data: { name: "WarningEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.Warn, async (warn) => {
      await botManager.SendMessageToTalkChannel(warn);
    });
  },
};

module.exports = event;
