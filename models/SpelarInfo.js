var mongoose = require('mongoose');

var SpelarSchema = new mongoose.Schema({
fnamn: String,
enamn: String,
position: String,
lag: String,
alder: Number
},
{
collection: 'spelare'
});

module.exports = mongoose.model('SpelarInfo', SpelarSchema);