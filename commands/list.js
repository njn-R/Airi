const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'list',
	    description: 'list all MPAs',
        execute(message)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            mongoose.set('useCreateIndex', true);
            
            let flag = 0;
            for(let i=0; i<5; i++)
            {                   
                var query = Collection.findOne({'mpanumber': i});        
                query.select('mpaname mpanumber');
                query.exec(function(err,Collection)
                {
                    if(err)
                        return console.log(err);
                    try
                    {                    
                        message.channel.send("```MPA: "+ Collection.mpaname + "    Number: "+ Collection.mpanumber + "```");                           
                    }
                    catch
                    {
                        flag = flag + 1;
                        if(flag === 5)
                        {
                            message.channel.send("No MPAs found!");
                        }
                    }
                });                         
            }  


        }                    
};


module.exports.help =
{
    name: "list"
}
