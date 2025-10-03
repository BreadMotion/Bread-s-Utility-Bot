/**
 * @typedef {import('./Interface/interface').CommandModule} CommandModule
 */
const { SlashCommandBuilder } = require("discord.js");

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

/**Steamの情報取得
 * @type {CommandModule}*/
const command = {
  name: "Cmd_Steam",
  data: new SlashCommandBuilder()
    .setName("cmd-steam")
    .setDescription("SteamAPI Test(まだ未実装です。)"),
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
