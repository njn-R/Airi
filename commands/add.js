//const Discord = require("discord.js");
const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
//var customfunctions = require("./functions.js")

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
                useUnifiedTopology: true               
            }); 
          
 
                let temp = message.guild.member(message.mentions.users.first());
                let usertoadd = temp.displayName;
               
                if(usertoadd === null||usertoadd === undefined)
                {
                    return message.channel.send("User not found");
                }




                function getPlayercount(args)
                {
                    var query = Collection.findOne({'mpaname':args[0]});
                    return query;
                }

                var query =  getPlayercount(args);
                query.select('playercount maxplayercount');
                query.exec(function(err,Collection)
                {
                    if(err)
                        return console.log(err);
                    console.log(Collection.maxplayercount);
                    checkMPAFull(Collection.playercount, Collection.maxplayercount)
                   
                });



                function checkMPAFull(playercount, maxplayercount)
                {
                    if(playercount === maxplayercount)
                    {
                        message.channel.send("MPA is full!");   
                    }
                    else{

                        
                        Collection.updateOne( { 'mpaname': args[0] },{$push: {players: usertoadd}}, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                    
                                message.channel.send("Added " + usertoadd + " to MPA!");    
                            }
                        });
                        Collection.updateOne( { 'mpaname': args[0] }, {$inc: {playercount:1}  }, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                      
                            }
                        });    
                    }
    
                }
              
        }                    
};


module.exports.help =
{
    name: "add"
}







           
       
