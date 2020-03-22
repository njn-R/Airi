const mongoose = require('mongoose');
const Collection = require("../models/model.js");

module.exports =
{
    name: 'close',
    description: 'Close MPA',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,           
        }); 
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
        
        if(message.member.has('444176946780438548') || message.member.id === "480464745921642497")
        {
            let length = args.length;
            for(let i = 0; i<length; i++)
            {               
                Collection.findOneAndDelete({'mpanumber': args[i]}, (err,docs) =>
                {
                    if(err) 
                        console.log(err);
                    else 
                    {
                        if(docs === null)
                            return message.channel.send("MPA not found!"); 
                        else             
                            message.channel.send("MPA " + args[i] + " closed!");    
                    }
                });
            }
        }
        else
            message.channel.send("You do not have permission to use that command!");       
    }                    
};


module.exports.help =
{
    name: "close"
}
