/**
 * @typedef {import('./Interface/interface.d.ts').EventModule} EventModule
 */
const { Events } = require("discord.js");
const BotManager = require("../Class/BotManager");

/**コマンド検知イベント
 * @type {EventModule}*/
const event = {
  data: { name: "EvtInteractCreate" },
  execute: function () {
    BotManager.I.Client.on(Events.InteractionCreate, async (interaction) => {
      await BotManager.I.ExecuteAllButtonEvent(interaction);
      if (!interaction.isChatInputCommand()) return;
      else {
        BotManager.I.ExecuteCommand(interaction);
      }
    });
  },
};

module.exports = event;
