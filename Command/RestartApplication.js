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
  execute: async function (_) {
    const path = require("path");
    const scriptPath = path.resolve(__dirname, "../Shell/Reset.sh");
    exec(`source ${scriptPath}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

module.exports = command;
