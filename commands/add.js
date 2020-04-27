const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'add',
    description: 'Add to MPA',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useUnifiedTopology: true               
        }); 
        mongoose.set('useCreateIndex', true);


            if(isNaN(args[0])) 
                return message.channel.send("Please write the MPA number!");

            let usertoadd = [];
            let temp = message.mentions.users;
            temp.forEach((users) => {
                let temp2 = message.guild.member(users);
                usertoadd.push(temp2.displayName);
            }); 
            message.channel.send(usertoadd);
            if (typeof usertoadd !== 'undefined' && usertoadd.length === 0)
                return message.channel.send("No users mentioned!");
            

            var query =  Collection.findOne({'mpanumber':args[0]});
            if(query.mongooseCollection.collection == null)
                return message.channel.send("No MPA found!");
            query.select('playercount maxplayercount players');
            query.exec(function(err,Collection)
            {
                if(err)
                    return console.log(err);
                else             
                    checkPlayer(Collection.players, usertoadd , Collection.playercount, Collection.maxplayercount);                                     
            });

            function checkPlayer(players, usertoadd, playercount, maxplayercount)
            {
                    for(let i = 0; i<usertoadd.length; i++)
                    {                        
                        if(players.includes(usertoadd[i]))
                        {
                            if(usertoadd.length === 1)             
                                return message.channel.send("Player already in MPA!");                
                            else                  
                                return message.channel.send("One or more of those players already in MPA!");                          
                        }                    
                        else
                            addPlayer(playercount, maxplayercount);
                    }                        
            }

            function addPlayer(playercount, maxplayercount)
            {       
                if(playercount === maxplayercount)                
                    message.channel.send("MPA is full!");                          
                else
                {
                    Collection.updateMany( {'mpanumber': args[0] },{$push: {players: usertoadd}, $inc: {playercount:usertoadd.length}}, (err,docs) =>
                    {
                        if(err) 
                            console.log(err);
                        else                                                                   
                            message.channel.send("Added " + usertoadd + " to MPA!");             
                    });                      
                }               
                details.execute(message,args);
            }
    }                           
};

module.exports.help =
{
    name: "add"
}







           
       
