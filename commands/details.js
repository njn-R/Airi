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
            //mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
               
        }); 
        mongoose.set('useCreateIndex', true);

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
            try
            {
            
                let EQname = Collection.mpaname.charAt(0).toUpperCase() + Collection.mpaname.slice(1);
                
                try
                {
                    const mpaEmbed = new Discord.RichEmbed()
                    
                    .setTitle(EQname)
                    //.setURL('https://pso2.arks-visiphone.com/wiki/Specter_of_Destruction')
                    .setAuthor("MPA Number: "+Collection.mpanumber, 'https://i.imgur.com/HF4CEeN.png')
                    //.setDescription('Some description here')
                    //.setThumbnail('https://i.imgur.com/eKOaQE0.jpg')
                    //.addField('Players in MPA', Collection.playercount+"/"+Collection.maxplayercount)
                    //.addBlankField()
                    .setColor('#0099ff')
                    .addField('```Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")```", Collection.players, true)      
                    .setImage(Collection.eqimage)
                    //.addBlankField()
                    .setTimestamp()
                    .setFooter("Type >join "+ Collection.mpanumber + " to join mpa!");


                    message.channel.send(mpaEmbed);
                }
                catch
                {
                    const noplayerEmbed = new Discord.RichEmbed()
                    .setAuthor(EQname, 'https://imgur.com/GG6B0HQ.png', 'https://pso2.arks-visiphone.com/wiki/Specter_of_Destruction')
                    .setColor('#0099ff')
                    .addField('Players in MPA '+"("+Collection.playercount+"/"+Collection.maxplayercount+")", "No players in mpa!" , true)
                    .setImage(EQimage)
                    .setTimestamp()
                    .setFooter('Type >join to join mpa!');

                    message.channel.send(noplayerEmbed);
                    
                }
            }
            catch
            {
                
            }
                   
         });     
    } 
    
                     
};


module.exports.help =
{
    name: "details"
}

