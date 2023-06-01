const {SlashCommandBuilder} = require('discord.js');

/** /txtdel　選択したメンバーのメッセージを削除するスラッシュコマンド*/
module.exports =
{
    name: 'accountMessageDelete',
    data: new SlashCommandBuilder()
        .setName('txtdel')
        .setDescription('対象のメンバーのメッセージを削除します。')
        .addUserOption(option => 
            option
               .setName('target')
               .setDescription('メンバーを選択')
               .setRequired(true))
        .addStringOption(option =>
            option
                .setName('limit')
                .setDescription('フェッチする上限を決めます。')
                .setRequired(true))
        .addStringOption(option =>
            option
               .setName('reason')
               .setDescription('対象のメッセージを削除する理由')
        ),
    execute: async function(interaction){
        const user = interaction.options.getUser('target');
        const limit = interaction.options.getString('limit');
        const info = interaction.options.getString('reason') || 'NONE';

        const {channelID} = require('../Data/config.json');
        const channel = interaction.member.guild.channels.cache.get(channelID);
        const messages = await channel.messages.fetch({ limit: Number(limit) });
        const filtered = messages.filter(message => message.author.username === user.username);

        try { channel.bulkDelete(filtered); }
        catch(error) { await interaction.reply(`メッセージの削除に失敗しました。 Error : ${error}`); }
        await interaction.reply(`${user.tag}のメッセージを全消去しました。理由->${info}`);
    }
};