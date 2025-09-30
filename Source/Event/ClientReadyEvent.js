const { Events } = require("discord.js");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

// 起動処理イベント
module.exports = {
  data: { name: "clientReady" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.once(Events.ClientReady, async (message) => {
      console.log("起動処理を開始します。");
      const config = require("../Data/config.json");
      const channel = clientSrc.channels.cache.get(config.TokeChannelID);

      let index = 0;
      const data = [];
      let outputCommandStr = "";
      console.log("コマンドの登録作業を行います。");
      for (const command in commandsSrc) {
        try {
          data.push(commandsSrc[command].data);
          let msg = `Regist command ${index} is : ${commandsSrc[command].name}`;
          console.log(msg);
          outputCommandStr += `・/${commandsSrc[command].name}${"\n"}`;
        } catch (error) {
          let errorMsg = `${index} is Error: ${error}`;
          channel.send(errorMsg);
        }
        index++;
      }
      await clientSrc.application.commands.set(data, config.guildID);
      console.log("コマンドの登録作業終了しました。");
      await clientSrc.user.setPresence({
        activities: [{ name: "開発" }],
        status: "Online",
      });
      console.log("起動しました。");
    });
  },
};
