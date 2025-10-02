const { SlashCommandBuilder } = require("discord.js");

/**オンラインのメンバーをメンションします。*/
module.exports = {
  name: "onlineUserMension",
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("オンラインメンバーをメンションします。"),
  execute: async function (interaction) {
    const members = await interaction.member.guild.members.fetch();
    const online = members.map((d) => {
      if (!d.user.bot && d.presence?.status == "online")
        return `<@${d.user.id}>`;
      else return null;
    });

    /**@type {string[]}*/
    let onlineMembers = online.filter((d) => d != null).join("\n");
    for (let element of onlineMembers) {
      element = "- " + element;
    }

    /**@type {}*/
    await interaction.reply(`現在オンラインのメンバー:${"\n"}${onlineMembers}`);
  },
};
