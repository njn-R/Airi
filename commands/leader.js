const mongoose = require('mongoose');
const Collection = require("../models/model.js");
var details = require("./details.js")


module.exports =
{
    name: 'leader',
    description: 'Assign MPA leader',
    execute(message, args)
    {         
        mongoose.connect(process.env.mongodb,{
        //mongoose.connect('mongodb://localhost/db',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,   
        }); 
        mongoose.set('useCreateIndex', true);

        if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");

        let usertoadd = [];
        let temp = message.mentions.users;
        temp.forEach((users) => {
            let temp2 = message.guild.member(users);
            usertoadd.push(temp2.displayName);
        });
        if (typeof usertoadd !== 'undefined' && usertoadd.length === 0)   
            return message.channel.send("No users mentioned!");
        

        var query =  Collection.findOne({'mpanumber':args[0]});
        query.select('players');
        query.exec(function(err,Collection)
        {
            if(err)
                return console.log(err);
            try 
            {      
                let i,j;
                let arrayLength = Collection.players.length;
                for(i=0;i<arrayLength;i++)
                {       
                    for(j=0;j<usertoadd.length;j++)
                    {                       
                        if(Collection.players[i]===usertoadd[j])
                        {      
                            let temp = usertoadd[j] + "   **[Party Leader]**";
                            Collection.players.set(i, temp);
                            Collection.save().then(function(result){
                                details.execute(message,args);
                            });
                            message.channel.send(usertoadd[j] +" set as leader!");
                        }
                    }
                }                           
            }
            catch{}
        });
    }                    
};


module.exports.help =
{
    name: "leader"
}
