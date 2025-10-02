const { Events } = require("discord.js");
let botManager = null;

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "ErrorEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    /*process.on("unhandledRejection", async (error) => {
      await message.channel.send(error);
    });*/
  },
};
