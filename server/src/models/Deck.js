const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  deck: mongoose.SchemaTypes.ObjectId,
  front: { type: String },
  back: {
    type: String,
  },
  counter: {
    type: Object,
    default: {
      appear: 0,
      remember: 0,
      forget: 0,
    },
  },
});

const DeckSchema = mongoose.Schema({
  name: String,
  parent: mongoose.SchemaTypes.ObjectId,
  children: [mongoose.SchemaTypes.ObjectId],
  cards: [CardSchema],
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
