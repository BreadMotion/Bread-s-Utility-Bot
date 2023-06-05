const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');
const { setTimeout } = require('node:timers/promises');

/** /info このBOTの設定を変更します。*/
module.exports =
{
    name: 'generalSetting',
    data: new SlashCommandBuilder()
        .setName('genel')
        .setDescription('Botの設定を変更します。(このBOTの管理者以外使用しないでください。)')
        .addStringOption(option =>
            option
               .setName('設定')
               .setDescription('設定するコンテンツ')
               .addChoices({name:'テキストチャンネル',value:'0'})
               .setRequired(true))
        .addStringOption(option => 
            option
               .setName("内容")
               .setDescription('設定するコンテンツの内容')
               .setRequired(true)),
    execute: async function(interaction){
        return;
        try{
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
            const reply = await interaction.reply(`投稿チャンネルが変更されました。${"\n"}Botを再起動してください。`);
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