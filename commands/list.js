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
            
            let i;
            for(i=0; i<5; i++)
            {
                var query = Collection.findOne({'mpanumber': i});
                if(query === null)
                {
                    
                }
                else
                {   
                    query.select('mpaname mpanumber');
                    query.exec(function(err,Collection)
                    {
                        if(err)
                            return console.log(err);
                        try{                       
                        message.channel.send("```MPA: "+ Collection.mpaname + "    Number: "+ Collection.mpanumber + "```");
                        }
                        catch{

                        }
                    });
                }
                
                    
            
            }    
             
              

        }                    
};


module.exports.help =
{
    name: "list"
}
