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
const {
  Events,
  Client,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const { EventEmitter } = require("node:events");
const ConfigManager = require("./ConfigManager");

/**ボット管理クラス*/
class BotManager {
  /** コンストラクター
   * @param {Record<string, EventModule>} events
   * @param {Record<string, CommandModule>} commands
   * @param {*} buttonEvents*/
  constructor(events, commands, buttonEvents) {
    console.log(BotManager.I);
    if (BotManager.I !== undefined)
      throw new Error("重複生成が発生しています。");
    else BotManager.I = this;

    /**@type {Client} */
    this.Client = BotManager.#GenerateClient();
    /**@type {Record<string, CommandModule>} */
    this.Commands = commands;
    /**@type {Record<string, EventModule>} */
    this.Events = events;
    /**@type {*} */
    this.ButtonEvents = buttonEvents;
    /**@type {Map<string, any>} */
    this.guildData = new Map();

    this.#RegistEvents();
    this.#Login();
  }

  /**@type {BotManager}*/
  static I;

  // #region ###GENERATE FUNCTION###
  /**DiscordAPIのClientを作成する
   * @returns {Client}*/
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
   * @returns {Promise<TextChannel|undefined>}*/
  async GetTalkChannel(guildID) {
    const channelId = ConfigManager.GetTalkChannel(guildID);
    if (!channelId) return undefined;

    try {
      const channel =
        await this.Client.channels.fetch(channelId);
      return /** @type {TextChannel} */ (channel);
    } catch (error) {
      console.error(
        `Failed to fetch channel ${channelId} for guild ${guildID}:`,
        error,
      );
      return undefined;
    }
  }
  /** ボットのUserインスタンス取得
   * @return {ClientUser}*/
  get User() {
    return this.Client.user;
  }

  getGuildData(guildId) {
    return this.guildData.get(guildId);
  }

  setGuildData(guildId, data) {
    this.guildData.set(guildId, data);
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
   * @return {Promise<Message|void>}}*/
  async SendMessageToTalkChannel(guildID, message) {
    /** @type {TextChannel} */
    const channel = await this.GetTalkChannel(guildID);

    if (!channel) {
      console.error(
        `Talk channel not found or configured for guild ${guildID}.`,
      );
      return;
    }

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
    const command = this.Commands[interaction.commandName];
    if (command == undefined)
      throw new Error(
        interaction.commandName +
          "がBotManagerに存在しない。\n BotManager.Commands is :" +
          BotManager.I.Commands,
      );
    await this.Commands[interaction.commandName].execute(
      interaction,
    );
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
