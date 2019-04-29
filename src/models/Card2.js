let mongoose = require('mongoose');

let CardSchema = mongoose.Schema({
  front: String,
  back: String,
  tags: [mongoose.SchemaTypes.ObjectId],
  score: Number,
});

let Card = mongoose.model('Card2', CardSchema);

module.exports = Card;
