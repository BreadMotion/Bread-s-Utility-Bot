/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const ConfigManager = require("./../Class/ConfigManager");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**エラーイベント
 * @type {EventModule}*/
const event = {
  data: { name: "ErrorEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on("unhandledRejection", async (error) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        await botManager.SendMessageToTalkChannel(guild, error);
      });
    });
  },
};

module.exports = event;
