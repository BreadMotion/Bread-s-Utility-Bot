/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 * @typedef {import('discord.js').Client} Client
 */
const { Events, GuildWidgetStyle } = require("discord.js");
const ConfigManager = require("./../Class/ConfigManager");
const BotManager = require("./../Class/BotManager");

/**参照用インスタンス
 * @type {BotManager}*/
let botManager = null;

/**起動イベント
 * @type {EventModule}*/
const event = {
  data: { name: "clientReady" },
  /** ボットマネージャーのインスタンス
   * @param {BotManager} botManagerInstance*/
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    /**@param {Client} _*/
    botManager.Client.once(Events.ClientReady, async (_) => {
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        await botManager.RegistCommand(guild);
      });
      BotManager.ExecuteAllGuildProcess(async function (guild) {
        botManager.SendMessageToTalkChannel(guild, "ただいま！");
      });
    });
  },
};

module.exports = event;
