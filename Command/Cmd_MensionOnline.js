/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");

/**オンラインのメンバーをメンションします。
 * @type {CommandModule}*/
const command = {
  name: "Cmd_MensionOnline",
  data: new SlashCommandBuilder()
    .setName("cmd-mension-online")
    .setDescription("オンラインメンバーをメンションします。"),
  execute: async function (interaction) {
    const guild = interaction.guild;
    const members = await guild.members.fetch();
    const online = members.map((d) => {
      if (!d.user.bot && d.presence?.status == "online")
        return `<@${d.user.id}>`;
      else return null;
    });

    /**@type {string[]}*/
    let onlineMembers = online.filter((d) => d != null);
    for (let element of onlineMembers) element = "- " + element;
    onlineMembers.join("\n");
    await interaction.reply(`現在オンラインのメンバー:${"\n"}${onlineMembers}`);
  },
};

module.exports = command;
