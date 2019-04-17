const mongoose = require('mongoose');
const CardSchema = mongoose.Schema({
  front: {
    type: String,
  },
  back: {
    type: String,
  },
  counter: {
    appear: 0,
    remember: 0,
    forget: 0,
  },
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
