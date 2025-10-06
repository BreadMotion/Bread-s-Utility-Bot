const { REST, Routes } = require("discord.js");
const ConfigManager = require("./Class/ConfigManager");
const fs = require("node:fs");
const commands = [];
const commandFiles = fs
  .readdirSync("./Command")
  .filter((file) => file.endsWith(".js"));
const rest = new REST({ version: "10" }).setToken(ConfigManager.Token);

//コマンドモジュール読み込み。
console.log("モジュール読み込み");
for (const file of commandFiles) {
  const command = require(`./Command/${file}`);
  console.log("loaded:" + command.name);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options,
  });
}

(async () => {
  for (let guildId of ConfigManager.AllGetGuildID) {
    try {
      console.log(`Deploying to ${guildId}...`);
      const route = Routes.applicationGuildCommands(
        ConfigManager.ClientID,
        guildId
      );

      // 旧コマンド削除
      const delRes = await rest.put(route, { body: [] });
      console.log(
        `Old commands cleared for ${guildId}. Response count: ${delRes.length}`
      );

      // 少し休憩
      await new Promise((r) => setTimeout(r, 3000));

      // 新規コマンド登録
      const res = await rest.put(route, { body: commands });
      console.log(`✅ Complete Deploy ${guildId} (${res.length} commands)`);
    } catch (err) {
      console.error(`❌ Failed for guild ${guildId}:`, err);
    }
  }
})();
