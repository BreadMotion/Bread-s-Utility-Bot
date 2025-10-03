/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");
const { spawn } = require("child_process");

/**シャットダウンします。
 * @type {CommandModule}*/
const command = {
  name: "Cmd_Shutdown",
  data: new SlashCommandBuilder()
    .setName("cmd-shutdown")
    .setDescription("シャットダウン"),
  execute: async function (_) {
       const path = require("path");
    const scriptPath = path.resolve(__dirname, "../Shell/Shutdown.sh");
    const subprocess = spawn("sh", [scriptPath], {
      detached: true,
      stdio: "ignore",
    });
   subprocess.unref();
    process.exit();
  },
};

module.exports = command;
