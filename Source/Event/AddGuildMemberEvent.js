const {Client, Events} = require('discord.js');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = 
{
    data: { name: 'guildMemberAdd' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;

        clientSrc.on(Events.GuildMemberAdd, async member => {
            console.log("call : guildMemberAdd Event");
            const {channelID, guildID} = require('../Data/config.json');
            const channel = member.guild.channels.cache.get(channelID);
            try{ 
                channel.send(`${member.user.username}が参加しました。`); 
            }
            catch(error){ 
                console.log(`ErrorLog: ${error}`); 
            }
        });
    }
};