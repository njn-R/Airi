const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'close',
	    description: 'Close MPA',
        execute(message, args)
        {         
            //Connect to database
            //mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
        
                let length = args.length;
                let i;
                for(i = 0; i<length; i++)
                {               
                        Collection.findOneAndDelete({'mpaname': args[i]}, (err,docs) =>
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
                                message.channel.send("MPA Closed!");    
                            }
                        });
                }

        }                    
};


module.exports.help =
{
    name: "close"
}
