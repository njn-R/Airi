const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'removel',
    description: 'Remove MPA leader',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
        //mongoose.connect('mongodb://localhost/db',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,        
        }); 
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        let usertoremove = [];
        let original = [];
        let temp = message.mentions.users;
        temp.forEach((users) => {
            let temp2 = message.guild.member(users);
            original.push(temp2.displayName);
            usertoremove.push(temp2.displayName + "   **[Party Leader]**");
        });
        if (typeof usertoremove !== 'undefined' && usertoremove.length === 0)
            return message.channel.send("No users mentioned!");


        var query =  Collection.findOne({'mpanumber':args[0]});
        query.select('players');
        query.exec(function(err,Collection)
        {
            if(err)
                return console.log(err);
            try 
            {      
                let i,j;
                let arrayLength = Collection.players.length;
                for(i=0;i<arrayLength;i++)
                {                                
                    for(j=0;j<usertoremove.length;j++)
                    {     
                        if(Collection.players[i]===usertoremove[j])
                        {                                  
                            Collection.players.set(i, original[j]);
                            Collection.save().then(function(result)
                            {
                                details.execute(message,args);
                            });
                            message.channel.send("Removed " + original[j] + " from leaders!");
                        }
                    }
                }         
            }
            catch{}
        });
    }                    
};


module.exports.help =
{
    name: "removel"
}
