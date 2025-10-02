const { Client } = require("discord.js");
const { token } = require("../Data/config.json");

/**ボット管理クラス*/
class BotManager {
  /** コンストラクター
   * @param {Client<Boolean>} client
   * @param {*} events
   * @param {*} commands
   * @param {*} ButtonEvents */
  constructor(client, events, commands, buttonEvents) {
    /** @type {Client<Boolean>} */
    this.Client = client;
    /** @type {*} */
    this.Commands = commands;
    /** @type {*} */
    this.Events = events;
    /** @type {*} */
    this.ButtonEvents = buttonEvents;

    this.#RegistEvents();
    this.#Login();
  }

  /**イベント登録*/
  #RegistEvents() {
    for (const event in this.Events) {
      this.Events[event].execute(this);
    }
  }

  /**ログイン処理*/
  async #Login() {
    this.Client.login(token);
  }
}

module.exports = { BotManager };
