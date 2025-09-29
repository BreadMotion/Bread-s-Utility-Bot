const { Client, Events, MessageType } = require("discord.js");
let clientSrc = undefined;
let commandsSrc = {};
let buttonEventsSrc = {};

// TODO: イベント検知していない
//メッセージ検知
module.exports = {
  data: { name: "messageCreateEvent" },
  execute: function (client, commands, buttonEvents) {
    clientSrc = client;
    commandsSrc = commands;
    buttonEventsSrc = buttonEvents;

    clientSrc.on(Events.MessageCreate, async (message) => {
      // ドキュメント投稿
      await message.channel.send("メッセージ検知");
      if (message.type === MessageType.ThreadCreated) {
        const reply = await message.channel.send(
          [
            `新規${message.channel.name}が投稿されました！`,
            `投稿者 : ${message.author}`,
            `フォーラムch : ${message.channel}`,
            `タイトル : ${message.channel.content}`,
          ].join("\n")
        );
        await reply.react("👋");
      }
    });
  },
};
