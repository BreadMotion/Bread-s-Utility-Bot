const {REST, Routes} = require('discord.js');
const {clientID, guildID, token} = require('./Data/config.json');

//ファイルシステムを使用して./Commandにあるソースからモジュールをロードします。
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./Command').filter(file => file.endsWith('.js'));
const rest = new REST({version:'10'}).setToken(token);

//コマンドモジュール読み込み。
console.log('Command Fileを解析します。');
for(const file of commandFiles)　{
    console.log(`${file}を解析します。`);
    const command = require(`./Command/${file}`);
    console.log('取得しました。');
    commands.push(command.data);
    console.log('登録しました。')
}
console.log('Command Fileの解析が終了しました。');

(async ()=>{
    try {
        console.log(`${commands.length}個のアプリケーションコマンドを登録します。`);
        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        );
        console.log(`${commands.length}のサーバー固有のコマンドが登録されました。`);
    }
    catch(error){ console.error('コマンドの登録中にエラーが起きました。', error); }
})();