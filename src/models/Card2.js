let mongoose = require('mongoose');

let CardSchema = mongoose.Schema({
  front: String,
  back: String,
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  score: {
    type: Number,
    default: 0,
  }
});

let Card = mongoose.model('Card2', CardSchema);

module.exports = Card;
