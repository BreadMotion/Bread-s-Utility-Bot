const { Events } = require("discord.js");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "ErrorEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    /*process.on("unhandledRejection", async (error) => {
      await message.channel.send(error);
    });*/
  },
};
