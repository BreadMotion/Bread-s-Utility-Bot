const { Events } = require("discord.js");
const config = require("../Data/config.json");
let botManager = null;

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "WarningEvent" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.Warn, async (warn) => {
      const channel = oldState.member.guild.channels.cache.get(
        config.TokeChannelID
      );
      await channel.send(warn);
    });
  },
};
