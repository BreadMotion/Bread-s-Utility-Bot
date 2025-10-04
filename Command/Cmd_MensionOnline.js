/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// オンラインメンバーメンション
/** 必要型参照定義
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 * @typedef {import('discord.js').ApplicationCommandOptionData} ApplicationCommandOptionData 
 * @typedef {import('discord.js').GuildMember} GuildMember
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
const CommandName = "cmd-mension-online"; 

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "オンラインメンバーをメンションします";

/** コマンドオプション定義
 * @type {ApplicationCommandOptionData[]}*/
const OptionData = [];

/** モジュール書き出し
 * @type {CommandModule}*/
const command = {
  name: CommandName,
  description: CommandDesc,
  options: OptionData,
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
