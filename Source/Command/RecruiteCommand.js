const {SlashCommandBuilder} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

/** /hello オンラインのメンバーをメンションします。*/
module.exports =
{
    RecruiteData: {},
    name: 'Recruite',
    data: new SlashCommandBuilder()
        .setName('recr')
        .setDescription('メンバー募集します')
        .addStringOption(option => 
          option
              .setName('game')
              .setDescription('募集するゲーム')
              .setRequired(true))
        .addStringOption(option => 
          option
              .setName('num')
              .setDescription('募集人数、半角で')
              .setRequired(true)),
    execute: async function(interaction){
      try
      {
        const member = await interaction.member;
        const game = interaction.options.getString('game') || 'NONE';
        const num = interaction.options.getString('num') || -1;

        this.RecruiteData[`${interaction.member.user.username}-${game}`] = Number(num);
        var str = '';

        Object.keys(this.RecruiteData).forEach(usernameANDgamenameKey => {
          str += `・${usernameANDgamenameKey} : ${this.RecruiteData[usernameANDgamenameKey]}人${"\n"}`;
        });

        const reply = await interaction.reply(`<@&1054712587020939344> ${member.user.username}が${game}で${num}人募集中です。`);
        const reply2 = await interaction.followUp(`現在募集しているゲームと人数一覧を表示します。${"\n"}${str}`);
        await setTimeout(1000 * 60 * 30);//30分後削除
        await reply.delete();
        await reply2.delete();
      }
      catch(error)
      {
        interaction.channel.send(`<@&1114914631153111081> Error : ${error}`);
      }
    }
};