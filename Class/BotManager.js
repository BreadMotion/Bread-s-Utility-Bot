/**
 * @typedef {import('discord.js').Channel} Channel
 * @typedef {import('discord.js').TextChannel} TextChannel
 * @typedef {import('discord.js').Message} Message
 */
const { Client, GatewayIntentBits } = require("discord.js");
const { token, guildID, TokeChannelID } = require("../Data/config.json");

/**ボット管理クラス*/
class BotManager {
  /** コンストラクター
   * @param {*} events
   * @param {*} commands
   * @param {*} ButtonEvents */
  constructor(events, commands, buttonEvents) {
    /** @type {Client<Boolean>} */
    this.Client = BotManager.#GenerateClient();
    /** @type {*} */
    this.Commands = commands;
    /** @type {*} */
    this.Events = events;
    /** @type {*} */
    this.ButtonEvents = buttonEvents;

    this.#RegistEvents();
    this.#Login();
  }

  // #region ###GENERATE FUNCTION###
  /**DiscordAPIのClient<Boolean>を作成する
   * @returns {Client<Boolean>}*/
  static #GenerateClient() {
    return new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    });
  }
  // #endregion ###GENERATE FUNCTION###
  // #region ###INITIALIZE FUNCTION###
  /**イベント登録*/
  #RegistEvents() {
    for (const event in this.Events) {
      this.Events[event].execute(this);
    }
  }

  /**コマンド登録*/
  async RegistCommand() {
    const data = [];
    for (const command in this.Commands) data.push(this.Commands[command].data);
    await this.Client.application.commands.set(data, guildID);
  }

  /**ログイン処理*/
  async #Login() {
    this.Client.login(token);
  }
  // #endregion ###INITIALIZE FUNCTION###
  // #region ###GETTER###
  /**ボットの会話投稿先取得
   * @returns {TextChannel}*/
  get GetTalkChannel() {
    return /** @type {TextChannel} */ (
      this.Client.channels.cache.get(TokeChannelID)
    );
  }
  // #endregion ###GETTER###
  // #region ###SETTER###
  /**アカウントステータス設定
   * @param {string} activ
   * @param {string} state*/
  async SetPresence(activ, state) {
    await this.Client.user.setPresence({
      activities: [{ name: activ }],
      status: state,
    });
  }
  // #endregion ###SETTER###
  // #region ###REQUEST###
  /**ボットの会話投稿先にメッセージ送信
   * @param {string}
   * @return {Promise<Message>}*/
  SendMessageToTalkChannel(message) {
    /** @type {TextChannel} */
    const channel = this.GetTalkChannel();
    return channel.send(message);
  }
  // #endregion ###REQUEST###
}

module.exports = { BotManager };
