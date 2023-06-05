const {SlashCommandBuilder} = require('discord.js');
const { setTimeout } = require('node:timers/promises');

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
        try
        {
        const info = interaction.options.getString('情報') || 'NONE';
        const members = await interaction.member.guild.members.fetch();
        let result = `このサーバーの全メンバーの`;
        if(info === '0') {
            const tags = members.map(member => member.user.tag);
            result += `タグ${"\n"}`;
            for(const tag of tags) { result += `${tag}${"\n"}` }
            const reply = await interaction.reply(result);
            await setTimeout(1000 * 60 * 30);//30分後削除
            await reply.delete(); 
        }
        else if(info === '1') {
            const names = members.map(member => member.user.username);
            result += `名前${"\n"}`;
            for(const name of names){ result += `${name}${"\n"}`; }
            const reply = await interaction.reply(result);
            await setTimeout(1000 * 60 * 30);//30分後削除
            await reply.delete(); 
        }
        else{ 
            const reply = await interaction.reply(`取得したい情報が分かりませんでした。: Target Infomation -> ${info}`);
            await setTimeout(1000 * 60 * 30);//30分後削除
            await reply.delete();  
        }
    }
    catch(error)
    {
        interaction.channel.send(`<@&1114914631153111081> Error : ${error}`);
    }
    }
};