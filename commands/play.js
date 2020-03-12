const { Util } = require("discord.js");
const ytdl = require("ytdl-core");

var servers = {};
module.exports = {
	name: 'play',
	description: 'Play a song!',
  execute(message, args) 
  {
    
            function play(connection, message){
              var server = servers[message.guild.id];
              server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}))
            
              //server.dispatcher = connection.play(server.queue[0])
            
              server.queue.shift();
            
              server.dispatcher.on("finish", function(){
                  if(server.queue[0]){
                    play(connection, message);
                  }
                  else{
                    connection.disconnect();
                  }
            
              })
            }
            
            
            if(!args[1])
            {
              message.channel.send("Gib Link!");
              return;
            }
            
            if(!message.member.voice.channel)
            {
              message.channel.send("Join a voice channel first!");
              return;
            }
            
            if(!servers[message.guild.id]) 
            servers[message.guild.id] = {
              queue: []
            }
            
            var server = servers[message.guild.id];
            
            server.queue.push(args[1]);
            
            //if(!client.voice.connections) 
            message.member.voice.channel.join().then(function(connection){
              play(connection, message);
            })
          },
};