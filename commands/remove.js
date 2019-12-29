const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'remove',
    description: 'Remove from MPA',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
        //mongoose.connect('mongodb://localhost/db',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,           
        }); 
        
        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        let temp = message.guild.member(message.mentions.users.first());
        let usertoremove = temp.displayName;
    
        if(usertoremove === null||usertoremove === undefined)
        {
            return message.channel.send("User not found");
        }

        // let usertoremove = [];
        // let temp = message.mentions.users;

        // temp.forEach((users) => {
        //     let temp2 = message.guild.member(users);
        //     usertoremove.push(temp2.displayName);
        // });

        // if (typeof usertoremove !== 'undefined' && usertoremove.length === 0)
        // {
        //     return message.channel.send("No users mentioned!");
        // }
        
        // let removePlayers = usertoremove.toString();
        // message.channel.send(removePlayers);

        Collection.findOneAndUpdate({'mpanumber': args[0], 'players': usertoremove}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
        //Collection.updateMany({'mpanumber': args[0]}, { $pull: {players: [removePlayers] }, $inc: {playercount:-(usertoremove.length)} },(err,docs) =>
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
        Collection.save();
    }                    
};


module.exports.help =
{
    name: "remove"
}
