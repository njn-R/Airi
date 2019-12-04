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
                        name: "**>create # MPAname**",
                        value: "Creates an MPA with given MPA name and MPA number",
                        inline: false
                      },
                      {
                        name: "**>details # **",
                        value: "Display details of the MPA",
                        inline: false
                      },
                      {
                        name: "**>join #**",
                        value: "Join the MPA",
                        inline: false
                      },
                      {
                        name: "**>leave #**",
                        value: "Leave the MPA",
                        inline: false
                      },
                      {
                        name: "**>add # @username**",
                        value: "Add another player to the MPA",
                        inline: false
                      },
                      {
                        name: "**>remove # @username**",
                        value: "Remove a player from the MPA",
                        inline: false
                      },
                      {
                        name: "**>leader # @username**",
                        value: "Assign a party leader for the MPA",
                        inline: false
                      },
                      {
                        name: "**>removeleader # @username**",
                        value: "Remove the party leader from the MPA",
                        inline: false
                      },
                      {
                        name: "**>size # MPAsize**",
                        value: "Change the player size of the MPA",
                        inline: false
                      },
                      {
                        name: "**>list**",
                        value: "List all the current MPAs",
                        inline: false
                      },
                ],
                footer: {
                    text: 'Airi MPA Bot',
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
