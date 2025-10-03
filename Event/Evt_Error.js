/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const BotManager = require("../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**エラーイベント
 * @type {EventModule}*/
const event = {
  data: { name: "EvtError" },
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
