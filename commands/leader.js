const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'leader',
	    description: 'Assign MPA leader',
        execute(message, args)
        {         
            //Connect to database
            //mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            mongoose.set('useCreateIndex', true);


                let temp = message.guild.member(message.mentions.users.first());
                let usertoadd = temp.displayName;
               
                if(usertoadd === null||usertoadd === undefined)
                {
                    return message.channel.send("User not found");
                }


              
              

        }                    
};


module.exports.help =
{
    name: "leader"
}
