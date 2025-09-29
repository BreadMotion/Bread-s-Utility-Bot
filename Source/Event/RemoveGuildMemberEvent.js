const { Events, GatewayIntentBits } = require("discord.js");
const { setTimeout } = require("node:timers/promises");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

//メンバーが減ったら発火する。
module.exports = {
  data: { name: "guildMemberRemove" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.on(Events.GuildMemberRemove, async (member) => {
      const config = require("../Data/config.json");
      const channel = oldState.member.guild.channels.cache.get(
        config.TokeChannelID
      );
      const botChannel = clientSrc.channels.cache.get(config.BotChannelID);
      const reply = await channel.send(
        `${member.user.username}がチャンネルから退場しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};
