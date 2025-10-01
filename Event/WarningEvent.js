const { Events } = require("discord.js");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "WarningEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    process.on(Events.Warn, async (warn) => {
      const config = require("../Data/config.json");
      const channel = oldState.member.guild.channels.cache.get(
        config.TokeChannelID
      );
      await channel.send(warn);
    });
  },
};
