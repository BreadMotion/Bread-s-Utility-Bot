const {Client, Events} = require('discord.js');

let clientSrc = undefined;
let commandsSrc =  {};
let buttonEventsSrc = {};

//メンバーが増えたら発火する。
module.exports = 
{
    data: { name: 'MessageReactionAddEvent' },
    execute: function(client,commands,buttonEvents){
        clientSrc = client;
        commandsSrc = commands;
        buttonEventsSrc = buttonEvents;

        clientSrc.on(Events.MessageReactionAdd, async (reaction, user) => {
            console.log("call : MessageReactionAddEvent Event");
            console.log(reaction);
            console.log('-------------------------------------------');
            console.log(user);
            try{
                //commandSrc['Recruite'].RecruiteData.key;
                channel.send(`At: ${reaction.message.guild}
                              From: ${`<@${user.id}>`}
                              To: ${`<@${message.author.mention}>`}
                              Reaction: ${reaction.emoji.name}`);
            }
            catch(error){
               console.log("error : MessageReactionAddEvent Event"); 
            }
        });
    }
};
