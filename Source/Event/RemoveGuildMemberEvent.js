const {Events, GatewayIntentBits} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//メンバーが減ったら発火する。
module.exports = 
{
    data: { name: 'guildMemberRemove' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;

        clientSrc.on(Events.GuildMemberRemove, async member => {
            const {channelID} = require('../Data/config.json');
            const channel = member.guild.channels.cache.get(channelID); 
            try {
                const reply = await channel.send(`${member.user.username}がチャンネルから退場しました。`); 
                await setTimeout(1000 * 60 * 30);//30分後削除
                await reply.delete();
            }
            catch(error) { 
                channel.send(`<@&1114914631153111081> Error: ${error}`);
            }
        });
    }
};