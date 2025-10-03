/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**警告イベント
 * @type {EventModule}*/
const event = {
  data: { name: "Evt_Warning" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.Warn, async (warn) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        await botManager.SendMessageToTalkChannel(guild, warn);
      });
    });
  },
};

module.exports = event;
