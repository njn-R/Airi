const Discord = require("discord.js");
const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'details',
	    description: 'Display details of MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
               
        }); 
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
        
        let M_number = args[0];
        Collection.findOne({'mpanumber':M_number}, (err, docs) =>
        {
            if(err) 
                console.log(err);
            else 
            {
                console.log(docs);
        
            }
        }).exec(function (err, Collection) 
        {
            if (err) return message.channel.send("Please type the MPA number!");
          
            
                let EQname = Collection.mpaname.charAt(0).toUpperCase() + Collection.mpaname.slice(1);
                let playerArray, playerArray1, playerArray2, playerArray3 = [];
                playerArray = Collection.players;

                if (typeof playerArray !== 'undefined' && playerArray.length === 0)
                {
                    const noplayerEmbed = new Discord.RichEmbed()
                    .setTitle(EQname)
                    .setAuthor("MPA Number: "+Collection.mpanumber, 'https://i.imgur.com/HF4CEeN.png')
                    .setColor('#0099ff')
                    .addField('Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")", "No players in mpa!" , true)
                    .setImage(Collection.eqimage)
                    .setTimestamp()
                    .setFooter("Type >join "+ Collection.mpanumber + " to join mpa!");

                    message.channel.send(noplayerEmbed);
                }
                
                else if(playerArray.length>4 && playerArray.length<=8)
                {
                    playerArray1 = playerArray.slice(0,4);
                    playerArray2 = playerArray.slice(4,8);

                    const mpaEmbed = new Discord.RichEmbed()              
                    .setTitle(EQname)
                    .setAuthor("MPA Number: "+Collection.mpanumber, 'https://i.imgur.com/HF4CEeN.png')
                    .setColor('#0099ff')
                    //.addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", Collection.players, true)      
                    .addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", "\u200b")
                    .addField("\Player List", playerArray1, true)
                    .addField("\Player List", playerArray2, true)      
                    .setImage(Collection.eqimage)
                    .setTimestamp()
                    .setFooter("Type >join "+ Collection.mpanumber + " to join mpa!");

                    message.channel.send(mpaEmbed);
                }
                
                else if(playerArray.length>8)
                {
                    playerArray1 = playerArray.slice(0,4);
                    playerArray2 = playerArray.slice(4,8);
                    playerArray3 = playerArray.slice(8,11);

                    const mpaEmbed = new Discord.RichEmbed()              
                    .setTitle(EQname)
                    .setAuthor("MPA Number: "+Collection.mpanumber, 'https://i.imgur.com/HF4CEeN.png')
                    .setColor('#0099ff')
                    //.addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", Collection.players, true)      
                    .addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", "\u200b")
                    .addField("\Player List", playerArray1, true)
                    .addField("\Player List", playerArray2, true)  
                    .addField("\Player List", playerArray3, true)    
                    .setImage(Collection.eqimage)
                    .setTimestamp()
                    .setFooter("Type >join "+ Collection.mpanumber + " to join mpa!");

                    message.channel.send(mpaEmbed);
                }

                else
                {
                    const mpaEmbed = new Discord.RichEmbed()              
                    .setTitle(EQname)
                    .setAuthor("MPA Number: "+Collection.mpanumber, 'https://i.imgur.com/HF4CEeN.png')
                    .setColor('#0099ff')
                    .addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", Collection.players, true)         
                    .setImage(Collection.eqimage)
                    .setTimestamp()
                    .setFooter("Type >join "+ Collection.mpanumber + " to join mpa!");

                    message.channel.send(mpaEmbed);
                }
           
                   
         });     
    } 
    
                     
};


module.exports.help =
{
    name: "details"
}

