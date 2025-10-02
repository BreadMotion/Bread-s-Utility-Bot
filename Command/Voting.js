const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

/**投票チャット作成*/
module.exports = {
  name: "vote",
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("投票を行います。")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("投票箱のタイトルを記述してください。")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    const title = interaction.options.getString("title");

    const voteEmbed = new EmbedBuilder()
      .setDescription("**Question:**\n" + title)
      .setImage("https://i.ibb.co/vxdBKFd/Untitled-1.gif")
      .addFields([
        { name: "Yes", value: "0", inline: true },
        { name: "No", value: "0", inline: true },
      ])
      .setColor([104, 204, 156]);

    const replyObject = await interaction.reply({
      embeds: [voteEmbed],
      fetchReply: true,
    });
    const voteButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Yes")
        .setCustomId(`Vote-Yes-${replyObject.id}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setLabel("No")
        .setCustomId(`Vote-No-${replyObject.id}`)
        .setStyle(ButtonStyle.Danger)
    );

    interaction.editReply({ components: [voteButtons] });
  },
};
