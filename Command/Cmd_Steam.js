/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DONT TOUCH /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// Steam API実行
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
const CommandName = "cmd-steam"; 

/** コマンドの説明
 * @type {string}*/
const CommandDesc = "SteamAPI (実装中)";

/** コマンドオプション定義
 * @type {ApplicationCommandOptionData[]}*/
const OptionData = [];

const steamWebApiKey = "E4675D951E4DC7D9CA59D5CCC355289C";
const nickName = "bread2000";
const minPlayTime = 60;
const fetchJson = (url) =>  
  new Promise((resolve, reject) => {
    console.log(`Access : ${url}`);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      });
  });

/** モジュール書き出し
 * @type {CommandModule}*/
const command = {
  name: CommandName,
  description: CommandDesc,
  options: OptionData,
  execute: async function (interaction) {
    return;

    const userJson = await fetchJson(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamWebApiKey}&vanityurl=${nickName}`
    );
    const steamId = userJson.response.steamId;

    const appListJson = await fetchJson(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamWebApiKey}&steamid=${steamId}`
    );
    const appIdList = appListJson.response.games
      .filter((app) => app.playtime_forever >= minPlayTime)
      .map((app) => app.appid);

    const genreObject = {};
    for (const appId of appIdList) {
      const appDetailObjectJson = await fetchJson(
        `http://store.steampowered.com/api/appdetails?appids=${appId}&filters=genres`
      );
      if (appDetailObjectJson[appId].datal.genres !== undefined) {
        appDetailObjectJson[appId].data.genres.forEach((genre) => {
          if (genreObject[genre.id] === undefined) {
            genreObject[genre.id] = {
              ...genre,
              const: 1,
            };
          } else {
            genreObject[genre.id].count++;
          }
        });
      }
    }
    const genreList = Object.values(genreObject);
    genreList.sort((a, b) =>
      a.count < b.count ? 1 : a.count > b.count ? -1 : 0
    );

    console.log(
      "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
    );
    console.log(`Nickname : ${nickName}
        Number of owned games: ${appListJson.response.games.length}
        Number of owned games (played over ${minPlayTime} minutes): ${appIdList.length}
        Results:`);
    console.log(genreList);
    console.log(
      "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
    );
    await interaction.reply(
      "SteamAPIで取得した情報を山崎のターミナルで表示しています。"
    );
  },
};

module.exports = command;
