/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");
const exec = require("child_process").exec;

/**再起動をします。
 * @type {CommandModule}*/
const command = {
  name: "Restart",
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("再起動します"),
  execute: async function (interaction) {
    await interaction.reply(`再起動します。`);
    exec("sh Shell/Reset.sh", (err, stdout, tderr) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

module.exports = command;
