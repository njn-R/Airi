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
            //mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
        
                    // //Check if MPA is full
                    // customfunctions.checkplayercount(function(callback,args)
                    // {
                    //     if(callback === true)
                    //     {
                    //         return message.channel.send("Sorry, the MPA is full!"); 
                    //     }
                    //     else
                    //     {
                    //         return message.channel.send("MPA is not full!"); 
                    //     }
                    // }

                // try
                // {
                //     var temp = message.mentions.members.first();
                //     var usertoadd = temp.user.username;
                // }
                // catch
                // {
                //     var usertoadd = message.username;
                // }
               
                var usertoadd = message.member.displayName;
    
                if(usertoadd === null||usertoadd=== undefined)
                {
                    return message.channel.send("User not found");
                }
                // Collection.findOne({'mpaname':args[0]}, (err,docs) =>
                // {
                //     if(err)
                //         console.log(err);
                //     else
                //     {
                //         console.log(docs); 
                //         if(docs === null)
                //         {
                //             return message.channel.send("No MPA with that name found!");
                //         }  
                //         if(Collection.playercount === Collection.maxplayercount) 
                //         {
                //             return message.channel.send("MPA is full!");
                //         }       
                //     }

                // });
                let max = 0;
            
                Collection.findOneAndUpdate({'mpaname': args[0], 'playercount': {$lt: max}},{$push: {players: usertoadd},$inc: {playercount:1}}, (err,docs) =>
                //Collection.findOneAndUpdate({'mpaname': args[0]},{$push: {players: usertoadd},$inc: {playercount:1}}, (err,docs) =>
                {
                    if(err) 
                        console.log(err);
                    else 
                    {
                        console.log(docs);     
                        if(docs === null)
                        {
                            return message.channel.send("MPA is full!");    
                        }          
                        message.channel.send("Added " + usertoadd + " to MPA!");    
                    }
                });

                // Collection.updateOne( { 'mpaname': args[0] },{$push: {players: usertoadd}}, (err,docs) =>
                // {
                //     if(err) 
                //         console.log(err);
                //     else 
                //     {
                //         console.log(docs);                    
                //         message.channel.send("Added " + usertoadd + " to MPA!");    
                //     }
                // });
                // Collection.updateOne( { 'mpaname': args[0] }, {$inc: {playercount:1}  }, (err,docs) =>
                // {
                //     if(err) 
                //         console.log(err);
                //     else 
                //     {
                //         console.log(docs);                      
                //     }
                // });    

        }                    
};


module.exports.help =
{
    name: "add"
}







           
       
