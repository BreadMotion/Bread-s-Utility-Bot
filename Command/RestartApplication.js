/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");
const { spawn } = require("child_process").exec;

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
    const subprocess = spawn("sh", [scriptPath], {
      detached: true,
      stdio: "ignore",
    });
    subprocess.unref();
    process.exit();
  },
};

module.exports = command;
