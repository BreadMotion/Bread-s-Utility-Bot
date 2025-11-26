/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// コマンドリスト取得
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
  ApplicationCommandOptionType,
} = require("discord.js");
const BotManager = require("../Class/BotManager");
// ############################
/** コマンドの名前
 * @type {string}*/
const CommandName = "cmd-command-list";

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "コマンドリストを取得します";

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
    /**@type {{ name: string, value: string, inline?: boolean }[]}*/
    let fields = [];
    for (const cmdName in BotManager.I.Commands) {
      const cmd = BotManager.I.Commands[cmdName];
      if (!cmd) continue;

      let optionDesc = "";
      if (cmd.options && cmd.options.length > 0) {
        optionDesc = cmd.options
          .map((opt) => {
            return `\`# ${opt.name}\` (${opt.type}) - ${opt.description || ""}`;
          })
          .join("\n");
      }

      fields.push({
        name: cmd.name,
        value: `${cmd.description}\n${optionDesc}`,
        inline: false,
      });
    }
    const embed = new EmbedBuilder()
      .setTitle("コマンド一覧")
      .setDescription(
        "このボットのコマンド一覧を出力します",
      )
      .setFields(fields)
      .setFooter({ text: `Call ${CommandName}` })
      .setTimestamp()
      .setColor("#fa4700");
    await BotManager.I.SendMessageToTalkChannel(
      interaction.guild.id,
      embed,
    );
  },
};

module.exports = command;
