const {SlashCommandBuilder} = require('discord.js');

/** /info ギルドの情報を取得します。*/
module.exports =
{
    name: 'guildInfo',
    data: new SlashCommandBuilder()
        .setName('ginfo')
        .setDescription('ギルドの情報を取得します。')
        .addStringOption(option =>
            option
               .setName('情報')
               .setDescription('取得する対象の情報を選択します。')
               .addChoices({name:'タグ',value:'0'})
               .addChoices({name:'名前', value:'1'})
               .setRequired(true)),
    execute: async function(interaction){
        const info = interaction.options.getString('情報') || 'NONE';
        const members = await interaction.member.guild.members.fetch();
        let result = `このサーバーの全メンバーの`;
        if(info === '0') {
            const tags = members.map(member => member.user.tag);
            result += `タグ${"\n"}`;
            for(const tag of tags) { result += `${tag}${"\n"}` }
            await interaction.reply(result);
        }
        else if(info === '1') {
            const names = members.map(member => member.user.username);
            result += `名前${"\n"}`;
            for(const name of names){ result += `${name}${"\n"}`; }
            await interaction.reply(result);
        }
        else{ await interaction.reply(`取得したい情報が分かりませんでした。: Target Infomation -> ${info}`); }
    }
};