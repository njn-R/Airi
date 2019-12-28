const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'add',
	    description: 'Add to MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useUnifiedTopology: true               
            }); 
            mongoose.set('useCreateIndex', true);


                // let temp = message.guild.member(message.mentions.users.first());
                // let usertoadd = temp.displayName;
               
                // if(usertoadd === null||usertoadd === undefined)
                // {
                //     return message.channel.send("User not found");
                // }


                if(isNaN(args[0])) return message.channel.send("Please write the MPA number too!");

                let usertoadd = [];
                let temp = message.mentions.users;

                temp.forEach((users) => {
                    let temp2 = message.guild.member(users);
                    usertoadd.push(temp2.displayName);
                });
                
                if (typeof usertoadd !== 'undefined' && usertoadd.length === 0)
                {
                    return message.channel.send("No users mentioned!");
                }

                function getPlayercount(args)
                {
                    var query = Collection.findOne({'mpanumber':args[0]});
                    return query;
                }

                var query =  getPlayercount(args);
                query.select('playercount maxplayercount players');
                query.exec(function(err,Collection)
                {
                    if(err)
                        return console.log(err);
                    

                        try 
                        {   
                            var result = checkPlayer(Collection.players, usertoadd);   
                          
                            if(result === true)
                            {   
                                return message.channel.send("Player(s) already in MPA!");
                            }
                            else
                            {
                                checkMPAFull(Collection.playercount, Collection.maxplayercount);
                            } 
                        }
                        catch
                        {
                            return message.channel.send("Player(s) already in MPA!");
                        }
                });

                function checkPlayer(players, usertoadd)
                {

                        for(let i = 0; i<usertoadd.length; i++)
                        {                        
                            if(players.includes(usertoadd[i]))
                            {
                                return true;
                            }
                            else
                                return false;
                        }
                                
                }

                function checkMPAFull(playercount, maxplayercount)
                {
                    
                    if(playercount === maxplayercount)
                    {
                        message.channel.send("MPA is full!");   
                    }
                    else{

                        
                        Collection.updateOne( { 'mpanumber': args[0] },{$push: {players: usertoadd}}, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                    
                                message.channel.send("Added " + usertoadd + " to MPA!");    
                            }
                        });
                        Collection.updateOne( { 'mpanumber': args[0] }, {$inc: {playercount:usertoadd.length}  }, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                      
                            }
                        });    
                        
                    }
                    details1(message, args);
                }
                
                function details1(message,args)
                {
                    details.execute(message,args);
                }
        }   
                         
};

module.exports.help =
{
    name: "add"
}







           
       
