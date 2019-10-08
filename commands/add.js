const Discord = require("discord.js");
const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var customfunctions = require("./functions.js")

module.exports =
    {
	    name: 'add',
	    description: 'Add to MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false
               
            }); 

            //Check if MPA is full
            customfunctions.checkplayercount(function(callback)
            {
                if(callback === true)
                {
                    return message.channel.send("Sorry, the MPA is full!"); 
                }
                else
                {
                    //Add player to database
                    try{
                            var temp = message.mentions.members.first();
                            var usertoadd = temp.user.username;
                    }catch{
                            var usertoadd = message.username;
                    }
                    
                    Collection.updateMany( {}, {$push: {players: usertoadd}}, (err,docs) =>
                    {
                        if(err) 
                            console.log(err);
                        else 
                        {
                            console.log(docs);                    
                            //message.channel.send("Added " + usertoadd + " to MPA!");     
                            customfunctions.incrementcount();

                        }
                    });

                }
            });
                 
        }
                     
};


module.exports.help =
{
    name: "add"
}







           
       
