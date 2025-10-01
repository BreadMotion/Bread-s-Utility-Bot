const { SlashCommandBuilder } = require("discord.js");
const { setTimeout } = require("node:timers/promises");

/** /hello オンラインのメンバーをメンションします。*/
module.exports = {
  name: "onlineUserMension",
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("オンラインメンバーをメンションします。"),
  execute: async function (interaction) {
    const members = await interaction.member.guild.members.fetch();
    const online = members.map((d) => {
      if (!d.user.bot && d.presence?.status == "online") {
        return `<@${d.user.id}>`;
      } else {
        return null;
      }
    });

    const reply = await interaction.reply(
      `現在オンラインのメンバーを全メンションします。${"\n"} 
             ${online.filter((d) => d != null).join("\n")}`
    );
    await setTimeout(1000 * 60 * 5); //5分後削除
    await reply.delete();
  },
};
