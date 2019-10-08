const Discord = require("discord.js");
const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var customfunctions = require("./functions.js")

module.exports =
    {
	    name: 'details',
	    description: 'Display details of MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false
               
        }); 


        Collection.findOne({'mpaname':'persona'}, (err, docs) =>
        {
            if(err) 
                console.log(err);
            else 
            {
                console.log(docs);
          
            }
        }).exec(function (err, Collection) 
        {
            if (err) return handleError(err);
            let EQname = Collection.mpaname.charAt(0).toUpperCase() + Collection.mpaname.slice(1);

            try
            {
                const mpaEmbed = new Discord.RichEmbed()
	            
	            //.setTitle(Collection.mpaname)
                //.setURL('https://pso2.arks-visiphone.com/wiki/Specter_of_Destruction')
                .setAuthor(EQname, 'https://imgur.com/GG6B0HQ.png', 'https://pso2.arks-visiphone.com/wiki/Specter_of_Destruction')
                //.setDescription('Some description here')
                //.setThumbnail('https://i.imgur.com/eKOaQE0.jpg')
                //.addField('Players in MPA', Collection.playercount+"/"+Collection.maxplayercount)
                //.addBlankField()
                .setColor('#0099ff')
                .addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", Collection.players, true)
                .setImage('https://i.imgur.com/eKOaQE0.jpg')
                //.addBlankField()
                .setTimestamp()
                .setFooter('React below to join!');

                message.channel.send(mpaEmbed);
            }
            catch
            {
                const noplayerEmbed = new Discord.RichEmbed()
                .setAuthor(EQname, 'https://imgur.com/GG6B0HQ.png', 'https://pso2.arks-visiphone.com/wiki/Specter_of_Destruction')
                .setColor('#0099ff')
                .addField('Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")", "No players in mpa!" , true)
                .setImage('https://i.imgur.com/eKOaQE0.jpg')
                .setTimestamp()
                .setFooter('React below to join!');

                message.channel.send(noplayerEmbed);
                 
            }
            });      
    }
                     
};


module.exports.help =
{
    name: "details"
}

