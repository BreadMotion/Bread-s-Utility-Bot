/**
 * @typedef {import('./Interface/interface').EventModule} EventModule
 */
const { Events } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const BotManager = require("../Class/BotManager");

/**メンバー参加イベント
 * @type {EventModule} */
const event = {
  name: "EvtRemoveMember",
  execute: function () {
    BotManager.I.Client.on(Events.GuildMemberRemove, async (member) => {
      const reply = await BotManager.I.SendMessageToTalkChannel(
        member.guild.id,
        `${member.user.username}がチャンネルから退場しました。`
      );
      await setTimeout(1000 * 60 * 5); //5分後削除
      await reply.delete();
    });
  },
};

module.exports = event;
