/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");

/**オンラインのメンバーをメンションします。
 * @type {CommandModule}*/
const command = {
  name: "Cmd_Recruite",
  data: new SlashCommandBuilder()
    .setName("cmd-recruite")
    .setDescription("メンバー募集します")
    .addStringOption((option) =>
      option.setName("game").setDescription("募集内容").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("num").setDescription("募集人数、半角で").setRequired(true)
    ),
  execute: async function (interaction) {
    const member = await interaction.member;
    const game = interaction.options.getString("game") || "NONE";
    const num = interaction.options.getString("num") || -1;

    let RecruiteData = {};
    RecruiteData[`${member.user.username}-${game}`] = {
      gamename: game,
      num: Number(num),
    };
    var str = "";

    Object.keys(RecruiteData).forEach((username) => {
      str += `・${username} : ${RecruiteData[username].num}人${"\n"}`;
    });

    const reply = await interaction.reply(
      `<@&1054712587020939344> ${member.user.username}が${game}で${num}人募集中です。`
    );
    const reply2 = await interaction.followUp(
      `現在募集コンテンツと人数を表示します。${"\n"}${str}`
    );
  },
};

module.exports = command;
