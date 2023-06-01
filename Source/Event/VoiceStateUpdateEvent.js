const {Events} = require('discord.js');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};
const memberTimeAry = [];

//メンバーがボイスチャットに動きが出たら発火する。
module.exports = 
{
    data: { name: 'voiceStateUpdate' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;
        
        clientSrc.on(Events.VoiceStateUpdate, (oldState, newState) => {
            console.log("call : voidStateUpdate Event");
            const config = require("../Data/config.json");
            const channel = oldState.member.guild.channels.cache.get(config.channelID);
            const time = new Date();

            if(oldState.channelId === null && newState.channelId !== null)
            {
                if(oldState.member.nickname !== null)
                {
                    var userName = oldState.member.user.username;
                    memberTimeAry.push({userName, time});
                    channel.send(`${oldState.member.nickname}が入室しました。`);
                    return;
                }
                else
                {
                    var userName = oldState.member.user.username;
                    memberTimeAry.push({userName, time});
                    channel.send(`${oldState.member.user.tag.slice(0, -5)}さん入室しました。`);
                    return;
                }
            }
            else if(oldState.channelId !== null && newState.channelId === null)
            {
                if(newState.member.nickname !== null)
                {
                    var filters = memberTimeAry.filter(element => {
                        return element.userName === newState.member.user.username
                    });
                    var nowTime = new Date;
                    channel.send(`${newState.member.nickname}さんが退出しました。`);
                    channel.send(`${(nowTime.getTime() - filters[0].time.getTime()) / (1000 * 60)}分作業していました。(結構誤差ある。)`);
                    return;
                }
                else
                {
                    var filters = memberTimeAry.filter(element => {
                        return element.userName === newState.member.user.username
                    });
                    var nowTime = new Date;
                    channel.send(`${newState.member.user.tag.slice(0, -5)}さんが退出しました。`);
                    channel.send(`${(nowTime.getTime() - filters[0].time.getTime()) / (1000 * 60)}分作業していました。(結構誤差ある。)`);
                    return;
                }
            }
        });
    }
};


