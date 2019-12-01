const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");

//Connect to database
//mongoose.connect('mongodb://nj:nj123456@ds029979.mlab.com:29979/heroku_0q4vv4cg',{
mongoose.connect('mongodb://localhost/db',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}); 

module.exports ={ 
    checkplayercount: function (callback, args) 
    {          
            //Check if MPA is full
            console.log(args);
            var query = Collection.findOne({ 'mpaname': args[0] });
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
