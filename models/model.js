const mongoose = require("mongoose");

const schema1 = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mpaname: String,
    players: [],
    playercount: Number,
    maxplayercount: Number,
    time: String,

},{collection: 'collections', strictQuery: true});


module.exports = mongoose.model("Collection", schema1, "Collection");


