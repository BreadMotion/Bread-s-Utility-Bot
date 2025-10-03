const { REST, Routes } = require("discord.js");
const config = require("./Data/config.json");
const guilds = require("./Data/guilds.json");

//ファイルシステムを使用して./Commandにあるソースからモジュールをロードします。
const fs = require("node:fs");
const commands = [];
const commandFiles = fs
  .readdirSync("./Command")
  .filter((file) => file.endsWith(".js"));
const rest = new REST({ version: "10" }).setToken(config.token);

//コマンドモジュール読み込み。
for (const file of commandFiles) {
  const command = require(`./Command/${file}`);
  commands.push(command.data);
}

(() => {
  Object.keys(guilds).forEach(async (guildId) => {
    const config = guilds[guildId];
    await rest.put(Routes.applicationGuildCommands(config.clientID, guildId), {
      body: commands,
    });
  });
})();
