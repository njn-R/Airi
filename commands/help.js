const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'help',
	    description: 'Help commands',
        execute(message)
        {         
            
            const helpEmbed = {
                color: 1752888,
                author: {
                    name: 'Bot Commands',
                },
                description: '```> = Bot prefix        # = MPA number```',
                fields: [
                    {
                        name: "Creates an MPA with given MPA name and MPA number",
                        value: "**>create # MPAname**",
                        inline: false
                      },
                      {
                        name: "Display details of the MPA",
                        value: "**>details # **",
                        inline: false
                      },
                      {
                        name: "Join the MPA",
                        value: "**>join #**",
                        inline: false
                      },
                      {
                        name: "Leave the MPA",
                        value: "**>leave #**",
                        inline: false
                      },
                      {
                        value: "**>add # @username**",  
                        name: "Add another player to the MPA",                     
                        inline: false
                      },
                      {
                        name: "Remove a player from the MPA",
                        value: "**>remove # @username**",
                        inline: false
                      },
                      {
                        name: "Assign a party leader for the MPA",
                        value: "**>leader # @username**",
                        inline: false
                      },
                      {
                        name: "Remove the party leader from the MPA",
                        value: "**>removeleader # @username**",
                        inline: false
                      },
                      {
                        name: "Change the player size of the MPA",
                        value: "**>size # MPAsize**",
                        inline: false
                      },
                      {
                        name: "List all the current MPAs",
                        value: "**>list**",
                        inline: false
                      },
                ],
                footer: {
                    text: '"Airi MPA Bot',
                    icon_url: 'https://i.imgur.com/HF4CEeN.png',
                },
            };
            
            message.channel.send({embed: helpEmbed}); 

        }                    
};


module.exports.help =
{
    name: "help"
}
