const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');

/** /info このBOTの設定を変更します。*/
module.exports =
{
    name: 'generalSetting',
    data: new SlashCommandBuilder()
        .setName('genel')
        .setDescription('Botの設定を変更します。')
        .addStringOption(option =>
            option
               .setName('設定')
               .setDescription('設定するコンテンツ')
               .addChoices({name:'テキストチャンネル',value:'0'})
               .addChoices({name:'名前', value:'1'})
               .setRequired(true))
        .addStringOption(option => 
            option
               .setName("内容")
               .setDescription('設定するコンテンツの内容')
               .setRequired(true)),
    execute: async function(interaction){
        const info = interaction.options.getString('設定') || 'NONE';
        const element = interaction.options.getString('内容') || 'NONE';

        if(info === '0') {
            let config = require('../Data/config.json');
            fs.writeFileSync('./Data/config.json', 
                        JSON.stringify({
                                clientID: config.clientID,
                                guildID: config.guildID,
                                token: config.token,
                                channelID: element
                            }, null, ' '));
            await interaction.reply(`投稿チャンネルが変更されました。${"\n"}Botを再起動してください。`);
        }
        else if(info === '1') {
            await interaction.reply(result);
        }
        else{ await interaction.reply(`取得したい情報が分かりませんでした。: Target Infomation -> ${info}`); }
    }
};