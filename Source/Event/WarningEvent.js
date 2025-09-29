const { Client, Events } = require("discord.js");
let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "messageCreateEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    process.on(Events.Warn, async (warn) => {
      await message.channel.send(warn);
    });
  },
};
