/**
 * @typedef {import('./Interface/interface.d.ts').EventModule} EventModule
 */
const { Events } = require("discord.js");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**コマンド検知イベント
 * @type {EventModule}*/
const event = {
  data: { name: "interactionCreate" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.InteractionCreate, async (interaction) => {
      await botManager.ExecuteAllButtonEvent(interaction);
      if (!interaction.isChatInputCommand()) return;
      else {
        botManager.ExecuteEvent(interaction);
      }
    });
  },
};

module.exports = event;
