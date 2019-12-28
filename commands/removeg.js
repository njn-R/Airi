const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'removeg',
	    description: 'Remove guest from MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            
                if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

                let usertoremove = args[1];
            
                if(usertoremove === null||usertoremove === undefined)
                {
                    return message.channel.send("Please enter the name of the guest to remove!");
                }

                Collection.findOneAndUpdate({'mpanumber': args[0], 'players': usertoremove}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
                {
                    if(err) 
                        console.log(err);
                    else 
                    {
                        console.log(docs);  
                        if(docs === null)
                        {
                            return message.channel.send("Error! MPA or Player Name entered is wrong!"); 
                        }  
                        else
                        {
                            details1(message,args);     
                            message.channel.send("Removed "+ usertoremove + " from MPA!");   
                        }
                    }
                });
               
                function details1(message,args)
                {
                    details.execute(message,args);
                }
        }                    
};


module.exports.help =
{
    name: "removeg"
}
