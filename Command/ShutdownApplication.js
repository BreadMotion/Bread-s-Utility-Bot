const { SlashCommandBuilder } = require("discord.js");
const exec = require("child_process").exec;

/**シャットダウンします。*/
module.exports = {
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
