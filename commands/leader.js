const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'leader',
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
                let usertoadd = temp.displayName;
            
                if(usertoadd === null||usertoadd === undefined)
                {
                    return message.channel.send("User not found");
                }

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
                                if(Collection.players[i]===usertoadd)
                                {
                                    
                                    let temp = usertoadd + "   [Party Leader]";
                                    Collection.players.set(i, temp);
                                    Collection.save()
                                    .then(function(result){
                                        details.execute(message,args);
                                    });
                                    message.channel.send(usertoadd +" set as leader!");

                                }
                            }
                               
                          
                        }
                        catch{
                            
                        }
                });
                
 
        }                    
};


module.exports.help =
{
    name: "leader"
}
