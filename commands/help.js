const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

module.exports =
    {
	    name: 'help',
	    description: 'Help commands',
        execute(message)
        {         
            
            message.channel.send(">create 1 abc \n >join 1 \n >leave 1 \n >list \n >add 1 @name \n >remove 1 @name \n >leader 1 \n >removeleader 1 \n >size 1 12 \n >details 1"); 

        }                    
};


module.exports.help =
{
    name: "help"
}
