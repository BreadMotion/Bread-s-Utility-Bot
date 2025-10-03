/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");
const exec = require("child_process").exec;

/**シャットダウンします。
 * @type {CommandModule}*/
const command = {
  name: "Shutdown",
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("シャットダウン"),
  execute: async function (interaction) {
    await interaction.reply(`シャットダウンをします`);
    exec("sh Shell/Shutdown.sh", (err, stdout, tderr) => {
      if (err) console.log(err);
    });
  },
};
module.exports = command;
