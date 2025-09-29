const { Client, Events } = require("discord.js");
const VoteButton = require("./Button/VoteButtons");
const { setTimeout } = require("node:timers/promises");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

//コマンド系の文字列から始まるチャットが送信されたら発火する。
module.exports = {
  data: { name: "interactionCreate" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.on(Events.InteractionCreate, async (interaction) => {
      const config = require("../Data/config.json");
      const botChannel = clientSrc.channels.cache.get(config.BotChannelID);
      for (const event in buttonEventsSrc) {
        await buttonEventsSrc[event].execute(interaction);
      }
      if (!interaction.isChatInputCommand()) {
        return;
      } else {
        const command = commandsSrc[interaction.commandName];
        await command.execute(interaction);
      }
    });
  },
};
