const Discord = require("discord.js");
const mongoose = require("mongoose");
const Collection = require("../models/model.js");


module.exports =
    {
	    name: 'create',
	    description: 'Create an MPA',
        execute(message, args)
        {
            let mpaName = args[0];
            for(i=1 ; i<args.length; i++)
            {
                mpaName = mpaName + " " + args[i];
            }

            mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true
            });

            const newdocument = new Collection(
            {
                _id: mongoose.Types.ObjectId(),         
                mpaname: mpaName,
                players: message.author.username,
                playercount: 1,
                maxplayercount: 8,
                time: message.createdAt
            });
            newdocument.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            message.channel.send("MPA created!");
        }
};
module.exports.help =
{
    name: "create"
}

