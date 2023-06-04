const {Client, Events} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

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
            const {channelID} = require('../Data/config.json');
            const channel = member.guild.channels.cache.get(channelID);
            try{ 
                const reply = await channel.send(`${member.user.username}が参加しました。`); 
                await setTimeout(1000 * 60 * 30);//30分後削除
                await reply.delete();
            }
            catch(error){ 
                await txtChannel.send(`Error : ${error}`);
            }
        });
    }
};