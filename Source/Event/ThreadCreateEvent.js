const { Client, Events } = require("discord.js");

let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

// TODO: イベント検知していない
module.exports = {
  data: { name: "ThreadCreateEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.on(Events.ThreadCreate, async (thread) => {
      // ドキュメント投稿
      const config = require("../Data/config.json");
      const user = await clientSrc.users.fetch(thread.ownerId);
      const channel = clientSrc.channels.cache.get(config.TokeChannelID);
      console.log(user);
      const reply = await channel.send(
        [
          `新規スレッドが投稿されました！`,
          `投稿者 : ${user}`,
          `フォーラムch : ${thread.parent.name}`,
          `タイトル : ${thread.name}`,
        ].join("\n")
      );
      await reply.react("👀");
    });
  },
};
