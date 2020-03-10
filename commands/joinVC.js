const commando = require('discord.js-commando')

// module.exports = class JoinVoiceChannelCommand extends commando.Command{
//     constructor(client){
//         super(client, {
//             name: 'joinVC',
//             group: 'music',
//             memberName: 'joinVC',
//             description: 'Joins a voice channel'
//         })
//     }
module.exports =
{
    name: 'joinVC',
    description: 'Joins a voice channel',
    execute(message)
    {   
  //  async execute(message) {
        let vc = message.guild.channels.find(ch => ch.name.toLowerCase() === 'FredBot Music Room' && ch.type === 'voice')
        //if(vc && !vc.connection) {
            vc.join();
        //}
    }
}