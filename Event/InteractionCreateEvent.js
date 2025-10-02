const { Events } = require("discord.js");
const config = require("../Data/config.json");
let botManager = null;

//コマンド系の文字列から始まるチャットが送信されたら発火する。
module.exports = {
  data: { name: "interactionCreate" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.InteractionCreate, async (interaction) => {
      const botChannel = botManager.Client.channels.cache.get(
        config.TokeChannelID
      );
      for (const event in botManager.ButtonEvents) {
        await botManager.ButtonEvents[event].execute(interaction);
      }

      if (!interaction.isChatInputCommand()) return;
      else {
        console.log(interaction.commandName);
        await botManager.Commands[interaction.commandName].execute(interaction);
      }
    });
  },
};
