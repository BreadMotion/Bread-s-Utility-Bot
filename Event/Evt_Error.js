/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const BotManager = require("../Class/BotManager");

/**エラーイベント
 * @type {EventModule}*/
const event = {
  data: { name: "EvtError" },
  execute: function () {
    BotManager.I.Client.on("unhandledRejection", async (error) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        await BotManager.I.SendMessageToTalkChannel(guild, error);
      });
    });
  },
};

module.exports = event;
