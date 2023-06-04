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
            try{
                var txtChannel = clientSrc.channels.cache.get(reaction.message.channelId);
                var message = await txtChannel.messages.fetch(reaction.message.id);

                if(message.content.includes('@調査隊メンバー '))
                {
                    const reply = await txtChannel.send(`
リアクションが発生しました。
From: ${`<@${user}>`}
To: ${`<@${message.author}>`}
Content: ${`<${message.content}>`}
Reaction: ${`<${reaction.emoji}>`}
Message's URL: ${message.url}`);
                    await setTimeout(1000 * 60 * 30);//30分後削除
                    await reply.delete();
                }
            }
            catch(error){
               await txtChannel.send(`Error : ${error}`);
            }
        });
    }
};
