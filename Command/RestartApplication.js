const { SlashCommandBuilder } = require("discord.js");
const exec = require("child_process").exec;

module.exports = {
  name: "Restart",
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("再起動します"),
  //.addStringOption((option) =>
  //option.setName("").setDescription("").setRequired(true)
  //)
  execute: async function (interaction) {
    await interaction.reply(`再起動します。`);
    exec("sh Shell/Reset.sh", (err, stdout, tderr) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
