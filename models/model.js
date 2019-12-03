const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

const schema1 = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mpaname: String,
    mpanumber: {type: Number, unique : true},
    players: [],
    playercount: Number,
    maxplayercount: Number,
    time: String,
    eqimage: String,

},{collection: 'collections', strictQuery: true});

module.exports = mongoose.model("Collection", schema1, "Collection");


