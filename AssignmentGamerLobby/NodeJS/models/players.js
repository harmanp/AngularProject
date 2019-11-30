const mongoose = require('mongoose');

var Player = mongoose.model('Player',{
    name: { type: String},
    rank: { type: Number},
    score: { type: Number},
    time: { type: String},
    gamesPlayed: {type: String},
    status: {type: String}


});

module.exports = { Player } ;