const {REST, Routes} = require('discord.js');
const {config} = require('./Data/config.json');

//ファイルシステムを使用してモジュールをロードします。
const fs = reqire('node:fs');ddddddddd
const commands = [];
const commandFiles = fs.readdirSync('./Command').filter(file => file.endWith('.js'));
const rest = new REST();

//コマンドモジュール読み込み
console.log('Command Fileを読み込みます。');
for(const file of commandFiles)
{
  console.log(`${file}を読み込みます。`);
  const command = require(`./Command/${file}`);
  console.log('取得しました。');
  console.log('登録しました。');
}
console.log('Command Fileの解析が終了しました。');

(async () => {
  try
  {
    console.log(`${commands.length}個のアプリケーションコマンドを登録します。`);
    await rest.put(
      Routes.applicationGuildCommand(clientID, guildID),
      {body: commands}
    );
    console.log(`${commands.length}のサーバー固有のコマンドが登録されました。`);
  }
  catch(error){ console.error('コマンドの登録中にエラーがおきました。', error ); }
})();