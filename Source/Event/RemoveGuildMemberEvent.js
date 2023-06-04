const {Events, GatewayIntentBits} = require('discord.js');

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
                channel.send(`${member.user.username}がチャンネルから退場しました。`);  
            }
            catch(error) { 
                channel.send(`error Log: ${error}`);
            }
        });
    }
};