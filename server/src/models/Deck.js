const mongoose = require('mongoose');

const DeckSchema = mongoose.Schema({
    name: {
       type: String, 
    },
    cards: [mongoose.SchemaTypes.ObjectId]
})

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;