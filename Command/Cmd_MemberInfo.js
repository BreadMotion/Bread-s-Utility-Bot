/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 * @typedef {import('discord.js').GuildMember} GuildMember
 */
const { SlashCommandBuilder } = require("discord.js");

/**メンバー配列からタグ配列取得
 * @param {GuildMember[]} members
 * @return {string[]}*/
function GetMembersTag(members) {
  return members.map((member) => member.user.tag);
}

/**メンバー配列から名前配列取得
 * @param {GuildMember[]} members
 * @return {string[]}*/
function GetMembersName(members) {
  return members.map((member) => member.user.username);
}

/**ギルドの情報を取得します。
 * @type {CommandModule}*/
const command = {
  name: "Cmd_MemberInfo",
  data: new SlashCommandBuilder()
    .setName("cmd-member-info")
    .setDescription("ギルドの情報を取得します。")
    .addStringOption((option) =>
      option
        .setName("情報")
        .setDescription("取得する対象の情報を選択します。")
        .addChoices({ name: "タグ", value: "0" }, { name: "名前", value: "1" })
        .setRequired(true)
    )
    .toJSON(),
  execute: async function (interaction) {
    const info = interaction.options.getString("情報") || "NONE";
    const guild = interaction.guild;
    const members = await guild.members.fetch();
    const memberList = [...members.values()];

    let result = `このサーバーの全メンバーの`;
    if (info === "0") {
      const tags = GetMembersTag(memberList);
      result += `タグ${"\n"}`;
      for (const tag of tags) {
        result += `${tag}${"\n"}`;
      }
      await interaction.reply(result);
    } else if (info === "1") {
      const names = GetMembersName(memberList);
      result += `名前${"\n"}`;
      for (const name of names) {
        result += `${name}${"\n"}`;
      }
      await interaction.reply(result);
    } else {
      await interaction.reply(
        `取得したい情報が分かりませんでした。: Target Infomation -> ${info}`
      );
    }
  },
};

module.exports = command;
