
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
                description: '```Bot prefix: >       MPA number: # ```',
                fields: [
                    {
                        name: "**>create # MPAname**",
                        value: "Create MPA",
                        inline: false
                      },
                      {
                        name: "**>details # **",
                        value: "Display details of MPA",
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
                        value: "Add a player",
                        inline: false
                      },
                      {
                        name: "**>remove # @username**",
                        value: "Remove a player",
                        inline: false
                      },
                      {
                        name: "**>leader # @username**",
                        value: "Assign party leader",
                        inline: false
                      },
                      {
                        name: "**>removel # @username**",
                        value: "Remove party leader",
                        inline: false
                      },
                      {
                        name: "**>size # MPAsize**",
                        value: "Change player size of MPA",
                        inline: false
                      },
                      {
                        name: "**>list**",
                        value: "List all current MPAs",
                        inline: false
                      },
                      {
                        name: "**>guest # playername**",
                        value: "Add a guest",
                        inline: false
                      },
                      {
                        name: "**>removeg # playername**",
                        value: "Remove a guest",
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
