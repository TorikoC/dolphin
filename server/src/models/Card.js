const mongoose = require('mongoose');
const CardSchema = mongoose.Schema({
  front: {
    type: String,
  },
  back: {
    type: String,
  },
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
