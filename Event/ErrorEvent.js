/**
 * @typedef {import('./../Class/BotManager')} BotManager
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */

/**@type {BotManager} */
let botManager = null;

/**エラーイベント
 * @type {EventModule}*/
const event = {
  data: { name: "ErrorEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    /*process.on("unhandledRejection", async (error) => {
      await message.channel.send(error);
    });*/
  },
};

module.exports = event;
