const {Client, GatewayIntentBits} = require("discord.js");
const {token} = require('./Data/config.json');
const client = new Client({ intents: [
  Object.values(GatewayIntentBits).filter(Number.isInteger)],
  partials : [1,2,3,4,,5,6]
});

//ファイルシステムを使用して各モジュールのロードファイルを格納します。
const fs = require('node:fs');
const commands = {};
const commandFiles = fs.readdirSync('./Command').filter(file => file.endsWith('.js'));
const events = {};
const eventsFiles = fs.readdirSync('./Event').fileter(file => file.endWith('.js'));
const butotnEvents = {}
const buttonEventsFiles = fs.readdirSync('./Event/Button').filter(file => file.endWith('.js'));

//外部ファイルのモジュールを読み込み。 定義
function LoadFile(src, result, fileLayer)
{
  console.log('---------------------------------------');
  for(const file of src)
  {
    //TODO : 各外部モジュールの定義に data.nameでモジュール名を定義しておくように。
    console.log(`${file}を読み込みます。`);
    const item = require(`./${fileLayer}/${file}`);
    result[item.data.name] = item;
    console.log(`${file}のデータを読み取りました。`);
  }
  console.log('---------------------------------------');
}

//外部ファイルのモジュールを読み込み。　実行。
LoadFile(commandFiles, commands, 'Command');
LoadFile(eventsFiles, events, 'Event');
LoadFile(buttonEventsFiles, buttonEvents, 'Event/Button');

console.log('イベントDelegateの登録作業を行います。');
for(const event in events)
{
  //TODO : イベントモジュールの定義の際にexecute関数を定義すること。
  events[event].Execute(client, commands, buttonEvents);
  console.log(`Registed ; ${event}`);
}
console.log('イベントDelegateの登録作業を終了します。');

//ログイン処理
(async () => {
  console.log('Begin Login');
  try{ client.login(token); }
  catch(error){console.log(error)}
  console.log('End Login');  
})();
