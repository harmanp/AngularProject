const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Player } = require('../models/players');
//creating a router
// all the players
//=> localhost:3000/players/
router.get('/', (req, res) => {
    Player.find((err, docs) => {
        if (!err) { res.send(docs); }
        else{ console.log('Error in retrieving Player :' + JSON.stringify(err, undefined, 2)); }
    });
});

//for getting a player by the id
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id}');
    
    Player.findById(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else{console.log('Error in the retrieving player :' + JSON.stringify(err, undefined, 2));}
    });    

});

 

//adding the player
router.post('/', (req, res) => {
    var player1 = new Player({
        name: req.body.name,
        rank: req.body.rank,
        score: req.body.score,
        time: req.body.time,
        gamesPlayed: req.body.gamesPlayed,
        status: req.body.status,
    });
    player1.save((err, doc) => {
        if(!err) { res.send(doc);}
        else {console.log('Error in player save :' + JSON.stringify(err, undefined,2));}
    });
});

//for updating the player
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id}');

        var player1 = {
            name: req.body.name,
            rank: req.body.rank,
            score: req.body.score,
            time: req.body.time,
            gamesPlayed: req.body.gamesPlayed,
            status: req.body.status,

        };
        Player.findByIdAndUpdate(req.params.id, {$set: player1}, {new: true}, (err,doc) => {
            if(!err) { res.send(doc);}
            else { console.log('Error in the player Update:' + JSON.stringify(err, undefined, 2)); }

        });
});


// for deleting the player

router.delete('/:id', (req, res) => {

    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.param.id}' );

    Player.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err){res.send(doc);}
        else{console.log('Error in the player delete :' + JSON.stringify(err, undefined, 2));}
    });    
});

module.exports = router;
