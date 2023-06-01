const {Client, GatewayIntentBits} = require('discord.js');
const {token} = require('./Data/config.json');
const client = new Client({ intents: [
    Object.values(GatewayIntentBits).filter(Number.isInteger)], 
    partials : [1,2,3,4,5,6]
});

//ファイルシステムを使用して./Commandにあるソースからモジュールをロードします。
const fs = require('node:fs');
const commands = {};
const commandFiles = fs.readdirSync('./Command').filter(file => file.endsWith('.js'));
const events = {};
const evnetsFiles = fs.readdirSync('./Event').filter(file => file.endsWith('.js'));
const buttonEvents = {};
const buttonEventsFiles = fs.readdirSync('./Event/Button').filter(file => file.endsWith('.js'));

/**外部ファイルのモジュール読み込み*/
function LoadFile(src, result, fileLayer) {
    console.log('-------------------------------------------------');
    for(const file of src) {
        console.log(`${file}を読み込みます`);
        const item = require(`./${fileLayer}/${file}`);
        result[item.data.name] = item;
        console.log(`${file}のデータを読みとりました。`);
    }
    console.log('-------------------------------------------------');
}
LoadFile(commandFiles, commands, 'Command');//コマンドモジュール読み込み。
LoadFile(evnetsFiles, events, 'Event');//イベントモジュール読み込み。
LoadFile(buttonEventsFiles, buttonEvents, 'Event/Button');//ボタンイベントモジュール読み込み。

console.log('イベントDelegateの登録作業を行います。');
for(const event in events) {
    events[event].execute(client, commands, buttonEvents);
    console.log(`Registed : ${event}`);
}

//login処理。
(async () => {
    console.log('Begin Login');
    try {  client.login(token);  }
    catch(error){console.log(error); }
    console.log('End Login');
})();