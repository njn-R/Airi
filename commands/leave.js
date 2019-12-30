const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'leave',
    description: 'Leave MPA',
    execute(message, args)
    {   
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,          
        }); 
        
        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        var usertoremove = message.member.displayName;
        if(usertoremove === null||usertoremove=== undefined)
            return message.channel.send("User not found");
        
        Collection.findOneAndUpdate({'mpanumber': args[0]}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
        {
            if(err) 
                console.log(err);
            else 
            {
                if(docs === null)              
                    return message.channel.send("MPA not found!");       
                else       
                    message.channel.send("Left MPA!");        
            }
        });
        details.execute(message,args);       

    }                    
};


module.exports.help =
{
    name: "leave"
}
