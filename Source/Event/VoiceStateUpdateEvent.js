const {Events} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

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
        
        clientSrc.on(Events.VoiceStateUpdate, async (oldState, newState) => {
            const config = require("../Data/config.json");
            const channel = oldState.member.guild.channels.cache.get(config.channelID);
            try
            {
                const time = new Date();

            if(oldState.channelId === null && newState.channelId !== null)
            {
                if(oldState.member.nickname !== null)
                {
                    var userName = oldState.member.user.username;
                    memberTimeAry.push({userName, time});
                    const reply = await channel.send(`${oldState.member.nickname}が入室しました。`);
                    await setTimeout(1000 * 60 * 5);//5分後削除
                    await reply.delete();
                    return;
                }
                else
                {
                    var userName = oldState.member.user.username;
                    memberTimeAry.push({userName, time});
                    const reply = await channel.send(`${oldState.member.user.tag.slice(0, -5)}さん入室しました。`);
                    await setTimeout(1000 * 60 * 5);//5分後削除
                    await reply.delete();
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
                    const reply = channel.send(`${newState.member.nickname}さんが退出しました。`);
                    const reply2 = channel.send(`${(nowTime.getTime() - filters[0].time.getTime()) / (1000 * 60)}分作業していました。(結構誤差ある。)`);
                    await setTimeout(1000 * 60 * 5);//5分後削除
                    await reply.delete();
                    await reply2.delete();
                    return;
                }
                else
                {
                    var filters = memberTimeAry.filter(element => {
                        return element.userName === newState.member.user.username
                    });
                    var nowTime = new Date;
                    const reply = channel.send(`${newState.member.user.tag.slice(0, -5)}さんが退出しました。`);
                    const reply2 = channel.send(`${(nowTime.getTime() - filters[0].time.getTime()) / (1000 * 60)}分作業していました。(結構誤差ある。)`);
                    await setTimeout(1000 * 60 * 5);//5分後削除
                    await reply.delete();
                    await reply2.delete();
                    return;
                }
            }
        }
        catch(error)
        {
            channel.send(`<@&1114914631153111081> Error: ${error}`);
        }
        });
    }
};


