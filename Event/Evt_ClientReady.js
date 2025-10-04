/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 * @typedef {import('discord.js').Client} Client
 */
const { Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**起動イベント
 * @type {EventModule}*/
const event = {
  name: "EvtClientReady",
  execute: function () {
    /**@param {Client} _*/
    BotManager.I.Client.once(Events.ClientReady, async (_) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        BotManager.I.SendMessageToTalkChannel(guild, "ただいま！");
      });
    });
  },
};

module.exports = event;
