/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**警告イベント
 * @type {EventModule}*/
const event = {
  data: { name: "Evt_Warning" },
  execute: function () {
    BotManager.I.Client.on(Events.Warn, async (warn) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        await BotManager.I.SendMessageToTalkChannel(guild, warn);
      });
    });
  },
};

module.exports = event;
