const mongoose = require("mongoose");
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
{
    name: 'create',
    description: 'Create an MPA',
    execute(message, args)
    {  
        mongoose.connect(process.env.mongodb,{
            useNewUrlParser: true,
            useUnifiedTopology: true              
        });
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
        
        let mpanumber = args[0];
        const mpaName = message.content.slice(10);
            
        let mpcount;
        let eqimage;

        if(mpaName.toLowerCase().includes('persona') || mpaName.toLowerCase().includes('mask'))
        {
            mpcount = 12;
            eqimage = 'https://i.imgur.com/dVk6uF5.jpg';
        }
        else if(mpaName.toLowerCase().includes('eva'))
        {
            mpcount = 8;
            eqimage = 'https://i.imgur.com/vQNMF02.png';   
        }
        else if(mpaName.toLowerCase().includes('pd') || mpaName.toLowerCase().includes('profound'))
        {
            mpcount = 12;  
            eqimage = 'https://i.imgur.com/DUH9rKa.png';
        }
        else if(mpaName.toLowerCase().includes('dragon') || mpaName.toLowerCase().includes('lizard'))
        {
            mpcount = 12;  
            eqimage = 'https://i.imgur.com/lMqNAdA.png';
        }
        else if(mpaName.toLowerCase().includes('armada'))
        {
            mpcount = 8; 
            eqimage = 'https://i.imgur.com/5UQAw5e.png';   
        }  
        else if(mpaName.toLowerCase().includes('white') || mpaName.toLowerCase().includes('wd'))
        {
            mpcount = 12; 
            eqimage = 'https://i.imgur.com/cQz2N83.png';   
        }   
        else if(mpaName.toLowerCase().includes('choco'))
        {
            mpcount = 12; 
            eqimage = 'https://i.imgur.com/UZ1qyrW.png';   
        }           
        else if(mpaName.toLowerCase().includes('mining') || mpaName.toLowerCase().includes('base') || mpaName.toLowerCase().includes('defense') || mpaName.toLowerCase().includes('VR'))
        {
            mpcount = 12; 
            eqimage = 'https://i.imgur.com/GiCHdsl.png';   
        }           
        else if(mpaName.toLowerCase().includes('trigger') || mpaName.toLowerCase().includes('tg'))
        {
            mpcount = 4; 
            eqimage = 'https://i.imgur.com/iDGpHuG.jpg';   
        }        
        else
        {
            mpcount = 12;   
            eqimage = 'https://i.imgur.com/aTMCx3T.jpg';
        }
     
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
        
        newdocument.save().then( function(result) 
        {
            details.execute(message,args);
        }).catch( function(err)
        {   
            if(err)             
                return message.channel.send("An MPA with that number already exists!");                             
        });       
    }   
};


module.exports.help =
{
    name: "create"
}

