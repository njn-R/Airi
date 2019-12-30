const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'guest',
    description: 'Add a guest to MPA',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useUnifiedTopology: true               
        }); 
        mongoose.set('useCreateIndex', true);
      
        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
        
        let usertoadd = args[1];    
        if(usertoadd === null||usertoadd === undefined)   
            return message.channel.send("Please enter the name of the guest!");

        var query =  Collection.findOne({'mpanumber':args[0]});
        if(query.mongooseCollection.collection == null)
            return message.channel.send("No MPA found!");
        query.select('playercount maxplayercount players');
        query.exec(function(err,Collection)
        {
            if(err)
                return console.log(err);
            checkPlayer(Collection.players, usertoadd , Collection.playercount, Collection.maxplayercount);
        });

        function checkPlayer(players, usertoadd, playercount, maxplayercount)
        {                  
            if(players.includes(usertoadd))
                return message.channel.send("Player already in MPA!");       
            else
                addPlayer(playercount, maxplayercount);       
        }

        function addPlayer(playercount, maxplayercount)
        {        
            if(playercount === maxplayercount)
                message.channel.send("MPA is full!");        
            else
            {        
                Collection.updateMany( { 'mpanumber': args[0] },{$push: {players: usertoadd}, $inc: {playercount:1}}, (err,docs) =>
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
    name: "guest"
}







           
       
