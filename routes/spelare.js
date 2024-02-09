var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var SpelarInfo = require('../models/SpelarInfo.js');

//req och res här är request- respektive response-objekten
router.get('/', function(req, res, next) {

//find är Mongoose funktion.
   SpelarInfo.find().then(function(spelarna) {

//Om det inte uppstår fel så skickas spelarna  i jsonformat
   res.json(spelarna);
   });

});

// Lägger till
router.post('/', function(req, res, next) {
    //req.body är innehållet i requestobjektet, dvs en json med en spelarna
    SpelarInfo.create(req.body).then(function(post) {
        res.json(post); //Här skickar vi tillbaka datan vi skickar in i databasen, om skrivningen gick bra
    }); 
  });

// Tar bort baserat på id
router.delete('/:id', function(req, res, next) {
    SpelarInfo.findByIdAndDelete(req.params.id, req.body).then(function(post) {
    res.json(post);
    });
 });

// Uppdaterar baserat på id
router.put('/:id', function(req, res, next) {
    SpelarInfo.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function(post) {
      res.json(post);
    });
  });

module.exports = router;