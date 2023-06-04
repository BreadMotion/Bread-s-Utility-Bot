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
            const channel = clientSrc.channels.cache.get(channelID);

            let index = 0;
            const data = [];
            let outputCommandStr ='';
            console.log('コマンドの登録作業を行います。');
            for(const command in commandsSrc) {
                try {
                    data.push(commandsSrc[command].data);
                    let msg = `Regist command ${index} is : ${commandsSrc[command].name}`;
                    console.log(msg);
                    outputCommandStr += `・/${commandsSrc[command].name}${"\n"}`;
                }
                catch(error) {
                    let errorMsg = `${index} is Error: ${error}`;
                    channel.send(errorMsg); 
                }
                index++;
            }
            await clientSrc.application.commands.set(data, guildID);
            console.log('コマンドの登録作業終了しました。');
        
            //起動したことをチャンネルに知らせます。
            await channel.send(`Bread Utility Botの起動準備が完了しました。
            
このボットは下記の機能を使用できます。
-------------コマンド系-------------
${outputCommandStr}
-----------------------------------

-------------イベント系-------------
・メンバー入退場時
・VC入退室時
・@調査隊メンバー ロールのメンションメッセージにスタンプを押したとき
・その他、細々としたイベント
-----------------------------------

コマンド系は【/(コマンド名) (各コマンドのオプション)】でご利用できます。
イベント系はそれぞれのイベントの条件が満たされた時に起動します。`);

            await clientSrc.user.setPresence({activities:[{name: 'Bread Utility Tool'}], status: "Online"});
            await console.log(`準備が完了しました。起動処理を終了します。`);
        });
    }
};