/**
 * @typedef {import('discord.js').Channel} Channel
 * @typedef {import('discord.js').TextChannel} TextChannel
 * @typedef {import('discord.js').Message} Message
 * @typedef {import('discord.js').ClientUser} ClientUser
 * @typedef {import('discord.js').Presence} Presence
 * @typedef {import('discord.js').ChatInputCommandInteraction} ChatInputCommandInteraction
 * @typedef {import('discord.js').Interaction} Interaction
 * @typedef {import('Event/Interface/interface').EventModule} EventModule
 * @typedef {import('Command/Interface/interface').CommandModule} CommandModule
 */
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const ConfigManager = require("./ConfigManager");

/**ボット管理クラス*/
class BotManager {
  /** コンストラクター
   * @param {Record<string, EventModule>} events
   * @param {Record<string, CommandModule>} commands
   * @param {*} buttonEvents*/
  constructor(events, commands, buttonEvents) {
    if(BotManager.I)
      return BotManager.I;
    else 
      BotManager.I = this;

    /**@type {Client<Boolean>} */
    this.Client = BotManager.#GenerateClient();
    /**@type {Record<string, CommandModule>} */
    this.Commands = commands;
    /**@type {Record<string, EventModule>} */
    this.Events = events;
    /**@type {*} */
    this.ButtonEvents = buttonEvents;

    this.#RegistEvents();
    this.#Login();
  }

  /**@type {BotManager}*/
  static I;

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
      this.Events[event].execute();
    }
  }

  /**ログイン処理*/
  async #Login() {
    this.Client.login(ConfigManager.Token);
  }
  // #endregion ###INITIALIZE FUNCTION###
  // #region ###GETTER###
  /**ボットの会話投稿先取得
   * @param {string} guildID
   * @returns {TextChannel}*/
  GetTalkChannel(guildID) {
    return /**@type {TextChannel}*/ (
      this.Client.channels.cache.get(ConfigManager.GetTalkChannel(guildID))
    );
  }
  /** ボットのUserインスタンス取得
   * @return {ClientUser}*/
  get User() {
    return this.Client.user;
  }
  // #endregion ###GETTER###
  // #region ###SETTER###
  /**アカウントステータス設定
   * @param {string} activ
   * @param {"online" | "idle" | "dnd" | "invisible"} state
   * @returns {Promise<Presence>}*/
  async SetPresence(activ, state) {
    /**@type {ClientUser}*/
    const user = this.User;
    return await user.setPresence({
      activities: [{ name: activ }],
      status: state,
    });
  }
  // #endregion ###SETTER###
  // #region ###REQUEST###
  /**ボットの会話投稿先にメッセージ送信
   * @param {string} guildID
   * @param {string | EmbedBuilder} message
   * @return {Promise<Message>}}*/
  async SendMessageToTalkChannel(guildID, message) {
    /** @type {TextChannel} */
    const channel = this.GetTalkChannel(guildID);
    if (message instanceof EmbedBuilder)
      return await channel.send({ embeds: [message] });
    return await channel.send(message);
  }

  /**ボタンイベントを全実行
   * @param {Interaction} interaction*/
  async ExecuteAllButtonEvent(interaction) {
    for (const event in this.ButtonEvents) {
      await this.ButtonEvents[event].execute(interaction);
    }
  }

  /**コマンドを実行
   * @param {ChatInputCommandInteraction} interaction*/
  async ExecuteCommand(interaction) {
    console.log('test');
    await this.Commands[interaction.commandName].execute(interaction);
  }
  // #endregion ###REQUEST###
  // #region ###UTILITY###
  /**全サーバーに処理する
   * @param {(guildID: string) => void} callback*/
  static ExecuteAllGuildProcess(callback) {
    const guilds = ConfigManager.AllGetGuildID;
    for (const guild of guilds) {
      callback(guild);
    }
  }
  // #endregion ###UTILITY###
}

module.exports = BotManager;
