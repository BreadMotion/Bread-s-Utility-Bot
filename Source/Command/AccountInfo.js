const {SlashCommandBuilder} = require('discord.js');

//TODO : 参加日がなんか特殊なフォーマットしている上、
//参照先が違うのか計算が上手くいかない。修正しろ。

/** /info 選択したメンバーの情報を取得します。*/
module.exports =
{
    name: 'accountInfo',
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('対象のメンバーの情報を取得します。')
        .addUserOption(option => 
            option
               .setName('対象')
               .setDescription('メンバーを選択')
               .setRequired(true))
        .addStringOption(option =>
            option
               .setName('情報')
               .setDescription('取得する対象の情報を選択します。')
               .addChoices({name:'ID',value:'0'})
               .addChoices({name:'サーバー参加日時', value:'1'})
               .addChoices({name:'名前', value:'2'})
               .setRequired(true)),
    execute: async function(interaction){
        const user = interaction.options.getUser('対象');
        const info = interaction.options.getString('情報') || 'NONE';
        
        if(info === '0'){
            await interaction.reply(`${user.tag}のIDは ${user.id} です。`);
        }
        else if(info === '1') {
            const sec = (Date.now() - interaction.member.joinedAt);
            const day = Math.round(sec / 864000);
            const hour = Math.round(sec % 86400 / 36000);
            const min = Math.round(sec % 3600 / 600);
            const rem = Math.round(sec % 60);
            console.log(`------------joinedAt : ${interaction.member.joinedAt}`);
            console.log(`----------------?    : ${interaction.member.joinedAtTimeStamp}`)
            console.log(`----------------base : ${sec}`);
            console.log(`sec / 8640000 ${sec / 8640000}`);
            console.log(`sec / 864000 ${sec / 864000}`);
            console.log(`sec / 86400 ${sec / 86400}`);

            console.log(`sec % 86400 / 3600000 ${sec % 86400 / 3600000}`);
            console.log(`sec % 86400 / 36000 ${sec % 86400 / 36000}`);
            console.log(`sec % 86400 / 3600 ${sec % 86400 / 3600}`);

            console.log(`sec % 3600 / 60000 ${sec % 3600 / 60000}`);
            console.log(`sec % 3600 / 60000 ${sec % 3600 / 6000}`);
            console.log(`sec % 3600 / 60000 ${sec % 3600 / 600}`);
            console.log(`sec % 3600 / 60 ${sec % 3600 / 60}`);

            console.log(`sec % 60 ${sec % 60}`);
            await interaction.reply(`${interaction.member.joinedAt} です。(バケモン嘘です。)`); 
            //await interaction.reply(`${user.tag}のサーバー参加時間${"\n"} ${day}日 ${hour}時 ${min}分 ${rem}秒間 です。`); 
        }
        else if(info === '2'){ 
            await interaction.reply(`${user.tag}の名前は ${user.username} です。`);  
        }
        else{
            await interaction.reply(`取得したい情報が分かりませんでした。: Target User -> ${user.tag}`); 
        }
    }
};