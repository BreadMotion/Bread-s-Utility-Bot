const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

/** discord.jsのClient APIを生成
 * @type {Client<Boolean>} */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

/** 指定ディレクトリのJSファイル一覧読み込み
 * @param {String} fileLayer
 * @return {string[]} */
function GetJSFile(fileLayer) {
  var files = fs.readdirSync(fileLayer);
  return files.filter((file) => file.endsWith(".js"));
}

/** 外部ファイルのモジュール読み込み
 * @param {string[]} src
 * @param {string} fileLayer
 * @return {*} */
function LoadModule(src, fileLayer) {
  let result = [];
  for (const file of src) {
    const item = require(`./${fileLayer}/${file}`);
    result[item.data.name] = item;
  }
  return result;
}

// ボットの作成とログイン処理
const { BotManager } = require("./Class/BotManager.js");
const botManager = new BotManager(
  client,
  LoadModule(GetJSFile("./Event"), "Event"),
  LoadModule(GetJSFile("./Command"), "Command"),
  LoadModule(GetJSFile("./Event/Button"), "Event/Button")
);
