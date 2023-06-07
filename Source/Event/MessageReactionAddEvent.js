const {Client, Events} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//メッセージにリアクションがあったら発火する。
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
            const botChannel = clientSrc.channels.cache.get(config.BotChannelID);
            var txtChannel = clientSrc.channels.cache.get(reaction.message.channelId);

            try{
                var message = await txtChannel.messages.fetch(reaction.message.id);
                //const users = await clientSrc.users.fetch({ limit: 100 });
                //RecruiteData.filter(user => user.username === 
                //console.log('fetch Finish');

                if(message.content.includes('<@&1054712587020939344>'))
                {
                    if(message.author.id === `1115265100249563158`)
                    {//リアクション対象がボットだった時
                        let RecruiteData = commandsSrc['recr'].RecruiteData;
                        
                        var reply = undefined;
                        for (let key in RecruiteData) {
                            reply = await txtChannel.send(`${"\n"}${`<${user}>`} -> ${`<@${key.substr(0, key.indexOf('-'))}>`} : ${`<${reaction.emoji}>`}
Message's URL: ${message.url}`);
                            break;
                          }
                        await setTimeout(1000 * 60 * 5);//5分後削除
                        await reply.delete();
                    }
                    else
                    {//リアクション対象がユーザーだった時
                        const reply = await txtChannel.send(`${"\n"}${`<${user}>`} -> ${`<${message.user.username}>`} : ${`<${reaction.emoji}>`}
Message's URL: ${message.url}`);
                        await setTimeout(1000 * 60 * 5);//5分後削除
                        await reply.delete();
                    }
                }
            }
            catch(error){
               await botChannel.send(`<@&1114914631153111081> Error : ${error}`);
            }
        });
    }
};
