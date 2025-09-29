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

    clientSrc.on(Events.MessageCreate, async (message) => {
      /*try{
                if(message.content === 'hello')
                {
                  const reply = await message.channel.send('hi!');
                  await reply.react('👋');
                }
            }
            catch(error) { 
                channel.send(`error Log: ${error}`);
            }*/
    });
  },
};
