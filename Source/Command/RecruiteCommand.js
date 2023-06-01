const {SlashCommandBuilder} = require('discord.js');

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
        const member = await interaction.member;
        const game = interaction.options.getString('game') || 'NONE';
        const num = interaction.options.getString('num') || -1;

        this.RecruiteData[`${interaction.member.user.username}-${game}`] = Number(num);
        var str = '';

        Object.keys(this.RecruiteData).forEach(key =>
        {
          str += `・${key} : ${this.RecruiteData[key]}人${"\n"}`;
        });
        await interaction.reply(
`${member.user.username}が${game}で${num}人募集中です。${"\n"}
現在募集しているゲームと人数一覧を表示します。${"\n"}${str}`);
    }
};