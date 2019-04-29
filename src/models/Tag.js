let mongoose = require('mongoose');

let TagSchema = mongoose.Schema({
  name: String,
});

let Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
