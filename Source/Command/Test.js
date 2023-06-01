const { SlashCommandBuilder } = require("discord.js");

module.exports = 
{
  name: 'test',
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("テストです。"),
  execute: async function (interaction) {
    //member, guild, とかはpythonと同じような依存関係のはずだから、
    //使いかたある程度分かってる体で構えとくね。
    //JSの考え方は、全てのオブジェクトがC#のClass（参照型）みたいなものって考えて良いよ。
    //リフレクション無しでリフレクションできるみたいな笑
    //TSはJSに制約を設けて、コードの可読性をました版みたいな感じ。
    //JSはやろうと思ったら悪いこといくらでもできる言語だから面白いよ。
    const members = await interaction.member.guild.members.fetch();
    await interaction.reply('実行可能！');
  }
};
