const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'size',
	    description: 'Change MPA size',
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

        
            Collection.findOneAndUpdate({'mpanumber': args[0]}, {'maxplayercount': args[1]},(err,docs) =>
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
                    message.channel.send("Changed MPA size!");    
                }
            });
                       

        }                    
};


module.exports.help =
{
    name: "size"
}
