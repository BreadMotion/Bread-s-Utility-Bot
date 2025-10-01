const { ButtonInteraction } = require("discord.js");
const votedMembers = new Set();

module.exports = {
  data: { name: "voteButton" },
  execute: async function (interaction) {
    if (!interaction.isButton()) return;

    const splittedArray = interaction.customId.split("-");
    if (splittedArray[0] !== "Vote") {
      console.log("No Vote String");
      return;
    }

    if (votedMembers.has(`${interaction.user.id}-${interaction.message.id}`))
      return interaction.reply({
        content: "あなたは投票済みです。",
        ephemeral: true,
      });

    votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);

    const voteEmbed = interaction.message.embeds[0];
    if (!voteEmbed)
      return interaction.reply({
        content: "投票の埋め込みができないです。",
        ephemeral: true,
      });

    const yesField = voteEmbed.fields[0];
    const noField = voteEmbed.fields[1];
    const VoteCountedReply = "投票されました。";

    switch (splittedArray[1]) {
      case "Yes":
        {
          const newYesCount = parseInt(yesField.value) + 1;
          yesField.value = newYesCount;

          interaction.reply({ content: VoteCountedReply, ephemeral: true });
          interaction.message.edit({ embeds: [voteEmbed] });
        }
        break;
      case "No":
        {
          const newNoCount = parseInt(noField.value) + 1;
          noField.value = newNoCount;

          interaction.reply({ content: VoteCountedReply, ephemeral: true });
          interaction.message.edit({ embeds: [voteEmbed] });
        }
        break;
    }
  },
};
