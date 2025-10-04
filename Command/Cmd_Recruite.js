/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// 指定コンテンツ募集
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
/** ApplicationCommandOptionType 列挙
 * @enum {number}
 */
const OptionType = {
  Subcommand: 1,
  SubcommandGroup: 2,
  String: 3,
  Integer: 4,
  Boolean: 5,
  User: 6,
  Channel: 7,
  Role: 8,
  Mentionable: 9,
  Number: 10,
  Attachment: 11
};
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// ###実行時に必要なモジュール###

// ############################
/** コマンドの名前
 * @type {string}*/
const CommandName = "cmd-recruite"; 

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "コンテンツを募集します";

/** コマンドオプション定義
 * @type {ApplicationCommandOptionData[]}*/
const OptionData = [
  { name: "game", description: "募集内容", type: OptionType.String, required: true },
  { name: "num", description: "募集人数", type: OptionType.Integer, required: true }
];

/** モジュール書き出し
 * @type {CommandModule}*/
const command = {
  name: CommandName,
  description: CommandDesc,
  options: OptionData,
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
