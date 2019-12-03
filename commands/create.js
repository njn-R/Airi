const Discord = require("discord.js");
const mongoose = require("mongoose");
const Collection = require("../models/model.js");


module.exports =
    {
	    name: 'create',
	    description: 'Create an MPA',
        execute(message, args)
        {  
            let mpanumber = args[0];
            const mpaName = message.content.slice(10);
            

           
            let mpcount;
            let eqimage;

            if(mpaName.includes('persona') || mpaName.includes('mask'))
            {
                mpcount = 12;
                eqimage = 'https://i.imgur.com/eKOaQE0.jpg';
            }
            else if(mpaName.includes('eva'))
            {
                mpcount = 8;
                eqimage = 'https://i.imgur.com/vQNMF02.png';   
            }
            else if(mpaName.includes('pd') || mpaName.includes('profound'))
            {
                mpcount = 12;  
                eqimage = 'https://i.imgur.com/DUH9rKa.png';
            }
            else if(mpaName.includes('dragon') || mpaName.includes('lizard'))
            {
                mpcount = 12;  
                eqimage = 'https://i.imgur.com/lMqNAdA.png';
            }
            else if(mpaName.includes('armada'))
            {
                mpcount = 8; 
                eqimage = 'https://i.imgur.com/5UQAw5e.png';   
            }        
            else
            {
                mpcount = 12;   
                eqimage = 'https://i.imgur.com/aTMCx3T.jpg';
            }


            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useUnifiedTopology: true              
            });
            mongoose.set('useCreateIndex', true);
           
            const newdocument = new Collection(
            {
                _id: mongoose.Types.ObjectId(),         
                mpaname: mpaName,
                mpanumber:mpanumber,
                players: message.member.displayName,
                playercount: 1,
                maxplayercount: mpcount,
                time: message.createdAt,
                eqimage : eqimage
            });
           
            newdocument.save()
            .then(result => console.log(result))
            .catch( function(err)
            {   if(err)
                    return message.channel.send(err);
                else
                    return message.channel.send("MPA created!");
            });
            
                        
        }
};
module.exports.help =
{
    name: "create"
}

