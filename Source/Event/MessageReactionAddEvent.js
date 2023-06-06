const {Client, Events} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = 
{
    data: { name: 'MessageReactionAddEvent' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;

        clientSrc.on(Events.MessageReactionAdd, async (reaction, user) => {
            console.log("call : MessageReactionAddEvent Event");
            const config = require("../Data/config.json");
            const channel = oldState.member.guild.channels.cache.get(config.BotChannelID);

            var txtChannel = clientSrc.channels.cache.get(reaction.message.channelId);
            try{
                var message = await txtChannel.messages.fetch(reaction.message.id);

                if(message.content.includes('<@&1054712587020939344>'))
                {
                    const reply = await channel.send(`
リアクションが発生しました。
From: ${`<@${user}>`}
To: ${`<@${message.author}>`}
Content: ${`<${message.content.replace('<@&1054712587020939344>', '@調査隊メンバー')}>`}
Reaction: ${`<${reaction.emoji}>`}
Message's URL: ${message.url}`);
                    await setTimeout(1000 * 60 * 5);//5分後削除
                    await reply.delete();
                }
            }
            catch(error){
               await channel.send(`<@&1114914631153111081> Error : ${error}`);
            }
        });
    }
};
