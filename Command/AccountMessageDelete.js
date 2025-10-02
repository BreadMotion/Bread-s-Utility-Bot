const { SlashCommandBuilder } = require("discord.js");
const { setTimeout } = require("node:timers/promises");

/**選択したメンバーのメッセージを削除するスラッシュコマンド*/
module.exports = {
  name: "accountMessageDelete",
  data: new SlashCommandBuilder()
    .setName("txtdel")
    .setDescription("対象のメンバーのメッセージを削除します。")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("メンバーを選択")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("limit")
        .setDescription("フェッチする上限を決めます。")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("対象のメッセージを削除する理由")
    ),
  execute: async function (interaction) {
    const user = interaction.options.getUser("target");
    const limit = interaction.options.getString("limit");
    const info = interaction.options.getString("reason") || "NONE";

    const channel = interaction.channel;
    const messages = await channel.messages.fetch({ limit: Number(limit) });
    const filtered = messages.filter(
      (message) => message.author.username === user.username
    );

    channel.bulkDelete(filtered);
    const reply = await interaction.reply(
      `${user.tag}のメッセージを全消去しました。理由->${info}\n-# このメッセージは５分後に削除されます。`
    );
    await setTimeout(1000 * 60 * 5); //5分後削除
    await reply.delete();
  },
};
