const {Client, Events} = require('discord.js');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//起動処理イベント
module.exports = 
{
    data: { name: 'clientReady' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;

        clientSrc.once(Events.ClientReady, async message => {
            console.log('起動処理を開始します。');
            const {channelID, guildID} = require('../Data/config.json');
        
            let index = 0;
            const data = [];
            console.log('コマンドの登録作業を行います。');
            for(const command in commandsSrc) {
                try {
                    data.push(commandsSrc[command].data);
                    let msg = `Regist command ${index} is : ${commandsSrc[command].name}`;
                    console.log(msg);
                }
                catch(error) {
                    let errorMsg = `Error ${index} is : ${error}`;
                    console.log(errorMsg);
                    clientSrc.channels.cache.get(channelID).send(errorMsg); 
                }
                index++;
            }
            await clientSrc.application.commands.set(data, guildID);
            console.log('コマンドの登録作業終了しました。');
        
            //起動したことをチャンネルに知らせます。
            await clientSrc.channels.cache.get(channelID).send('Bread Utility Botの起動準備が完了しました。');
            await clientSrc.user.setPresence({activities:[{name: 'Bread Utility Tool'}], status: "Online"});
            await console.log(`準備が完了しました。起動処理を終了します。`);
        });
    }
};