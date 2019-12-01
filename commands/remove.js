const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'remove',
	    description: 'Remove from MPA',
        execute(message, args)
        {         
            //Connect to database
            //mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            
                var usertoremove = message.member.displayName;
        
                if(usertoremove === null||usertoremove=== undefined)
                {
                    return message.channel.send("User not found");
                }

                Collection.findOneAndUpdate({'mpaname': args[0]}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
                {
                    if(err) 
                        console.log(err);
                    else 
                    {
                        console.log(docs);  
                        if(docs === null)
                        {
                            return message.channel.send("MPA not found!"); 
                        }              
                        message.channel.send("Removed " + usertoremove + " from MPA!");        
                    }
                });

        }                    
};


module.exports.help =
{
    name: "remove"
}