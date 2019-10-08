const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

//Connect to database
mongoose.connect('mongodb://localhost/db',{
    useNewUrlParser: true,
    useFindAndModify: false 
}); 

module.exports ={ 
    checkplayercount: function (callback) 
    {          
            //Check if MPA is full
            var query = Collection.findOne({ 'mpaname': 'persona' });
            query.select('playercount maxplayercount');
            query.exec(function (err, Collection) {
            if (err) return handleError(err);
            if(Collection.playercount === Collection.maxplayercount)
            {      
                callback(true);
            }
            else
            {
                callback(false);
            }
            });
            
            
    },
    incrementcount: function () 
    {
            //Update player count in MPA
            Collection.updateMany({}, {$inc: {playercount:1}  }, (err,docs) =>
            {
                if(err) 
                    console.log(err);
                else 
                {
                    console.log(docs);                      
                }
            });    
    },
    decrementcount: function () 
    {
            //Update player count in MPA
            Collection.updateMany({}, {$inc: {playercount:-1}  }, (err,docs) =>
            {
                if(err) 
                    console.log(err);
                else 
                {
                    console.log(docs);                      
                }
            });    
    }
};
