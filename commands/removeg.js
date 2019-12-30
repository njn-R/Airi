const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'removeg',
    description: 'Remove guest from MPA',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,      
        }); 
        
        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        let usertoremove = args[1]; 
        if(usertoremove === null||usertoremove === undefined) 
            return message.channel.send("Please enter the name of the guest to remove!");
        

        Collection.findOneAndUpdate({'mpanumber': args[0], 'players': usertoremove}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
        {
            if(err) 
                console.log(err);
            else 
            {
                if(docs === null)
                    return message.channel.send("Error! MPA or Player Name entered is wrong!"); 
                else
                {
                    details.execute(message,args);    
                    message.channel.send("Removed "+ usertoremove + " from MPA!");   
                }
            }
        });
    }                    
};


module.exports.help =
{
    name: "removeg"
}
