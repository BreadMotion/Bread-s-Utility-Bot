const {Client, Events} = require('discord.js');
const VoteButton = require('./Button/VoteButtons');
const wait = require('util').promisify(setTimeout);

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//コマンド系の文字列から始まるチャットが送信されたら発火する。
module.exports = 
{
    data: { name: 'interactionCreate' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;
        
        clientSrc.on(Events.InteractionCreate, async interaction => {
            console.log('call : InteractionCreate Event');
            for(const event in buttonEventsSrc) {
                await buttonEventsSrc[event].execute(interaction);
            }

            if(!interaction.isChatInputCommand()) { return; }
            if(interaction.commandName === '抱かれたい！') {
                await interaction.deferReply();
                await wait(6);
                await interaction.reply('抱かれたかったらしゃぶれ！');
                await wait(12);
                await interaction.editReply('しゃぶったらそこに寝転がれ！');
            }
            else {
                const command = commandsSrc[interaction.commandName];
                try { await command.execute(interaction);  }
                catch(error) {
                    console.error(error);
                    await interaction.reply({
                        content: 'コマンド実行時にエラーになりました。',
                        ephemeral: true,
                    });
                }
            }
        });
    }
};