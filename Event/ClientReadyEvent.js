const { Events } = require("discord.js");
let botManager = null;

// 起動処理イベント
module.exports = {
  data: { name: "clientReady" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.once(Events.ClientReady, async (message) => {
      console.log("起動処理を開始します。");
      const config = require("../Data/config.json");
      const channel = botManager.Client.channels.cache.get(
        config.TokeChannelID
      );

      const data = [];
      console.log("コマンドの登録作業を行います。");
      for (const command in botManager.Commands)
        data.push(botManager.Commands[command].data);
      await botManager.Client.application.commands.set(data, config.guildID);
      await botManager.Client.user.setPresence({
        activities: [{ name: "開発" }],
        status: "Online",
      });
      console.log("起動しました。");
    });
  },
};
