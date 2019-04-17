const db = require('../models');

async function getCards(req, res) {
  const result = await db.Card.find().sort({ _id: -1 });
  res.send(result);
}

async function getRandomCards(req, res) {
  let { size } = req.params;
  size = +size || 10;
  let pl = [
    {
      $match: {},
    },
    {
      $sample: {
        size: size,
      },
    },
  ];
  let result = await db.Card.aggregate(pl);
  res.send(result);
}

async function createCard(req, res) {
  const card = new db.Card(req.body);
  try {
    await card.save();
    res.send(card);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
}

async function updateCard(req, res) {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const update = { $set: {} };
  keys.forEach(k => {
    update.$set[k] = req.body[k];
  });
  db.Card.findByIdAndUpdate(id, update).exec();
  res.send('0k');
}

async function removeCard(req, res) {
  const { id } = req.params;
  db.Card.findByIdAndDelete(id).exec();
  res.send('ok');
}

async function removeCards(req, res) {
  db.Card.remove({}).exec();
  res.send('ok');
}

module.exports = {
  getCards,
  getRandomCards,
  createCard,
  updateCard,
  removeCard,
  removeCards,
};
