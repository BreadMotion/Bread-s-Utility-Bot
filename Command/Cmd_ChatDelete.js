/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// メッセージを削除します
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
  Attachment: 11,
};
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// ###実行時に必要なモジュール###
const { setTimeout } = require("node:timers/promises");
// ############################
/** コマンドの名前
 * @type {string}*/
const CommandName = "cmd-chat-delete";

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "メッセージを削除します";

/** コマンドオプション定義
 * @type {ApplicationCommandOptionData[]}*/
const OptionData = [
  /*{ 
    name: "target",
    description: "対象者を選択",
    type: OptionType.User,
    required: true,

  },
  {
    name: "limit",
    description: "フェッチ数を指定" ,
    type: OptionType.Integer,
    required: true,
  },
  {
    name: "reason",
    description: "対象のメッセージを削除する理由" ,
    type: OptionType.String,
    required: false,
  },
*/
];

/** モジュール書き出し
 * @type {CommandModule}*/
const command = {
  name: CommandName,
  description: CommandDesc,
  options: OptionData,
  execute: async function (interaction) {
    const user = interaction.options.getUser("target");
    const limit = interaction.options.getString("limit");
    const info = interaction.options.getString("reason") || "NONE";

    const channel = interaction.channel;
    const messages = await channel.messages.fetch({ limit: Number(limit) });
    const filtered = messages.filter(
      (message) => message.author.id === user.id
    );

    await channel.bulkDelete(filtered);
    const reply = await interaction.reply(
      `${user.tag}のメッセージを全消去しました。理由->${info}\n-# このメッセージは５分後に削除されます。`
    );
    await setTimeout(1000 * 60 * 5); //5分後削除
    await reply.delete();
  },
};

module.exports = command;
