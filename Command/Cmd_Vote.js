/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// 投票チャット作成
/** 必要型参照定義
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 * @typedef {import('discord.js').ApplicationCommandOptionData} ApplicationCommandOptionData
 */
/** オプション定義
 * @typedef {Object} CommandOption
 * @property {string} name - オプション名（小文字のみ、1-32文字）
 * @property {string} description - 説明文（1-100文字）
 * @property {number} type - オプションタイプ。以下の列挙を参照
 * @property {boolean} [required] - 必須かどうか
 * @property {CommandOptionChoice[]} [choices] - 選択肢を指定する場合
 * @property {number[]} [channelTypes] - type が Channel の場合、許可するチャンネル種別
 * @property {number} [minValue] - Number / Integer の最小値
 * @property {number} [maxValue] - Number / Integer の最大値
 * @property {boolean} [autocomplete] - オートコンプリートを有効にするか
 * @property {CommandOption[]} [options] - サブコマンド / サブコマンドグループ用の子オプション
 */
/** 選択肢定義
 * @typedef {Object} CommandOptionChoice
 * @property {string|number} name - 選択肢の表示名
 * @property {string|number} value - 選択肢の値
 */
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// ###実行時に必要なモジュール###
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
} = require("discord.js");
// ############################
/** コマンドの名前
 * @type {string}*/
const CommandName = "cmd-vote";

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "投票をおこないます";

/** コマンドオプション定義
 * @type {ApplicationCommandOptionData[]}*/
const OptionData = [
  {
    name: "title",
    description: "投票箱のタイトルを記述",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];

/**投票チャット作成
 * @type {CommandModule}*/
const command = {
  name: CommandName,
  description: CommandDesc,
  options: OptionData,
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

    /**@type {ActionRowBuilder<ButtonBuilder>} */
    const component = new ActionRowBuilder();
    component.addComponents(
      new ButtonBuilder()
        .setLabel("Yes")
        .setCustomId(`Vote-Yes-${replyObject.id}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setLabel("No")
        .setCustomId(`Vote-No-${replyObject.id}`)
        .setStyle(ButtonStyle.Danger)
    );

    interaction.editReply({ components: [component] });
  },
};

module.exports = command;
