const {Client, Events} = require('discord.js');
const VoteButton = require('./Button/VoteButtons');
const { setTimeout } = require('node:timers/promises');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//コマンド系の文字列から始まるチャットが送信されたら発火する。
module.exports = 
{
    data: { name: 'interactionCreate' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;
        
        clientSrc.on(Events.InteractionCreate, async interaction => {
            const config = require('../Data/config.json');
            const channel = clientSrc.channels.cache.get(config.channelID);
            
            for(const event in buttonEventsSrc) {
                await buttonEventsSrc[event].execute(interaction);
            }

            if(!interaction.isChatInputCommand()) { return; }
            else {
                const command = commandsSrc[interaction.commandName];
                try { 
                    await command.execute(interaction);
                }
                catch(error) {
                    await channel.send({
                        content: `<@&1114914631153111081> ${interaction.commandName}コマンド実行時にエラーになりました。${"\n"}errorLog: ${error}`,
                        ephemeral: true,
                    });
                }
            }
        });
    }
};