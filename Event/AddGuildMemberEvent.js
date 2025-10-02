const { Events } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const config = require("../Data/config.json");
let botManager = null;

//メンバーが増えたら発火する。
module.exports = {
  data: { name: "GuildMemberAdd" },
  execute: function (botManagerInstance) {
    botManager = botManagerInstance;
    botManager.Client.on(Events.GuildMemberAdd, async (member) => {
      console.log("call : guildMemberAdd Event");
      const channel = botManager.Client.channels.cache.get(
        config.TokeChannelID
      );
      const reply = await channel.send(
        `${member.user.username}が参加しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};
