const { REST, Routes } = require("discord.js");
const ConfigManager = require("./Class/ConfigManager");
const fs = require("node:fs");
const commands = [];
const commandFiles = fs
  .readdirSync("./Command")
  .filter((file) => file.endsWith(".js"));
const rest = new REST({ version: "10" }).setToken(ConfigManager.Token);

//コマンドモジュール読み込み。
for (const file of commandFiles) {
  const command = require(`./Command/${file}`);
  commands.push(command.data);
}

ConfigManager.AllGetGuildID.forEach(async (guildId) => {
  await rest.put(
    Routes.applicationGuildCommands(ConfigManager.ClientID, guildId),
    {body: commands}
  );
});
