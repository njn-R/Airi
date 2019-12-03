const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'removeleader',
	    description: 'Assign MPA leader',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            mongoose.set('useCreateIndex', true);


                let temp = message.guild.member(message.mentions.users.first());
                let temp2 = temp.displayName;
                let usertoremove = temp2 + "   [Party Leader]";
               
                if(usertoremove === null||usertoremove === undefined)
                {
                    return message.channel.send("User not found");
                }

                // Collection.findOneAndUpdate(
                //     {
                //         'mpanumber': args[0],
                //         'players.$': usertoadd,
                //     },
                //     {
                //         '$set': { 'players.$': "AAAA" }
                //     },
                //     function(error, success) {
                //        console.log(error, success);
                //     }
                // );
               

                var query =  Collection.findOne({'mpanumber':args[0]});
                query.select('players');
                query.exec(function(err,Collection)
                {
                    if(err)
                        return console.log(err);
    
                        try 
                        {      
                            let i;
                            let arrayLength = Collection.players.length;
                            for(i=0;i<arrayLength;i++)
                            {                        
                                if(Collection.players[i]===usertoremove)
                                {                                  
                                    Collection.players.set(i, temp2);
                                    Collection.save();
                                    message.channel.send("Removed leader!");
                                }
                            }
                            //details1(message,args);
                          
                        }
                        catch{
                            
                        }
                });

            

            // function details1(message,args)
            // {
            //     details.execute(message,args);
            // }
 
        }                    
};


module.exports.help =
{
    name: "removeleader"
}
