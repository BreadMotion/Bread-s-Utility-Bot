/**
 * ボットが参加しているサーバー一覧を取得するスクリプト
 */

const { Client, GatewayIntentBits } = require("discord.js");
const ConfigManager = require("./Class/ConfigManager"); // Token が入ったモジュール

// Client 作成
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("=== 参加しているサーバー一覧 ===");

  client.guilds.cache.forEach((guild) => {
    console.log(`- ${guild.name} (ID: ${guild.id})`);
  });

  console.log("=== 総数 ===", client.guilds.cache.size);

  // スクリプト終了
  process.exit(0);
});

client.login(ConfigManager.Token);