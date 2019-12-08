const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'close',
	    description: 'Close MPA',
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

            if(message.member.roles.has('444176946780438548'))
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
                                //console.log(docs);  
                                if(docs === null)
                                {
                                    return message.channel.send("MPA not found!"); 
                                }              
                                message.channel.send("MPA Closed!");    
                            }
                        });
                }
            }
            else
            {
                message.channel.send("You do not have permission to use that command!"); 

            }

        }                    
};


module.exports.help =
{
    name: "close"
}
