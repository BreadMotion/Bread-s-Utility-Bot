const { Events } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const config = require("../Data/config.json");
let botManager = null;

//メンバーが減ったら発火する。
module.exports = {
  data: { name: "guildMemberRemove" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.GuildMemberRemove, async (member) => {
      const channel = oldState.member.guild.channels.cache.get(
        config.TokeChannelID
      );
      const reply = await channel.send(
        `${member.user.username}がチャンネルから退場しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};
