const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  deck: mongoose.SchemaTypes.ObjectId,
  front: { type: String },
  back: {
    type: String,
  },
  score: { type: Number, default: 0 },
});

const DeckSchema = mongoose.Schema({
  name: String,
  parent: mongoose.SchemaTypes.ObjectId,
  children: [mongoose.SchemaTypes.ObjectId],
  cards: [CardSchema],
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
