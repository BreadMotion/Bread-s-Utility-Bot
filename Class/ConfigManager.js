/**
 * @typedef {import('discord.js').Client} Client
 */
const fs = require("fs");
const config = require("../Data/config.json");
const guildPath = "../Data/guilds.json";
let guilds = require(guildPath);

/**設定ファイル管理クラス*/
class ConfigManager {
  // #region ###GETTER###
  /**Token取得
   * @return {string}*/
  static get Token() {
    return config.token;
  }

  /**Client取得
   * @return {string}*/
  static get ClientID() {
    return config.token;
  }

  /**全サーバーID取得*/
  static get AllGetGuildID() {
    return Object.keys(guilds);
  }

  /**サーバー名取得
   * @param {string} guildID
   * @return {string}*/
  static GetServerName(guildID) {
    return guilds[guildID].name;
  }

  /**会話チャンネル取得
   * @param {string} guildID
   * @return {string}*/
  static GetTalkChannel(guildID) {
    return guilds[guildID].talkChannelID;
  }

  // #endregion ###GETTER###
  // #region ###REGIST###
  /**Guildデータ登録
   * @param {Client} client
   * @param {string} guildID
   * @param {string} talkChannelID*/
  static RegistGuildInfo(client, guildID, talkChannelID) {
    guilds[guildID] = {
      name: client.guilds.cache.get(guildID).name,
      talkChannelID: talkChannelID,
    };
    fs.writeFileSync(guildPath, JSON.stringify(guilds, null, 2), "utf8");
    guilds = require(guildPath);
  }
  // #endregion ###REGIST###
}

module.exports = ConfigManager;
