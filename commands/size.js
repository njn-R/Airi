const mongoose = require('mongoose');
const Collection = require("../models/model.js");

module.exports =
{
    name: 'size',
    description: 'Change MPA size',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,         
        }); 
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        Collection.findOneAndUpdate({'mpanumber': args[0]}, {'maxplayercount': args[1]},(err,docs) =>
        {
            if(err) 
                console.log(err);
            else 
            {
                if(docs === null)
                    return message.channel.send("MPA not found!"); 
                else    
                    message.channel.send("Changed MPA size!");    
            }
        });
    }                    
};


module.exports.help =
{
    name: "size"
}
