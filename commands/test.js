const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports =
    {
	    name: 'test',
	    description: 'test',
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

            var user = [];
            for(let i = 1; i<args.length; i++)
            {
                if (args[i]) 
                {   
                    let temp = args[i];
                    user.push(temp.slice(2));
                    

                }
            }      
            message.channel.send(user);
        }                    
};


module.exports.help =
{
    name: "test"
}
