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
            console.log("call : guildMemberRemove Event");
            const {channelID, guildID} = require('../Data/config.json');
            
            if(guildID !== member.guild.id)  { 
                console.log("Faled"); 
                return; 
            }
            try { member.guild.channels.cache.get(channelID).send(`${member.user.username}？どした？話きこか？`);  }
            catch(error) { console.log("error : guildMemberRemove Event");  }
        });
    }
};