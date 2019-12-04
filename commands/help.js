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
                        inline: true
                      },
                      {
                        name: "**>details # **",
                        value: "Display details of the MPA  ",
                        inline: true
                      },
                      {
                        name: "**>join #**",
                        value: "Join the MPA",
                        inline: true
                      },
                      {
                        name: "**>leave #**",
                        value: "Leave the MPA",
                        inline: true
                      },
                      {
                        name: "**>add # @username**",
                        value: "Add another player to the MPA",
                        inline: true
                      },
                      {
                        name: "**>remove # @username**",
                        value: "Remove a player from the MPA",
                        inline: true
                      },
                      {
                        name: "**>leader # @username**",
                        value: "Assign a party leader for the MPA",
                        inline: true
                      },
                      {
                        name: "**>removeleader # @username**",
                        value: "Remove the party leader from the MPA",
                        inline: true
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
