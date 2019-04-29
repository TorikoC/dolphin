let Card = require('../models/Card2');

async function getCards(req, res) {
  let { page, pageSize } = req.query;

  page = +page || 1;
  pageSize = +pageSize || 1;
  let skip = (page - 1) * pageSize;

  let p1 = Card.find()
    .skip(skip)
    .limit(pageSize);
  let p2 = Card.find().count();

  let results = await Promise.all([p1, p2]);
  let cards = results[0];
  let total = results[1];
  total =
    total % pageSize === 0 ? total / pageSize : Math.ceil(total / pageSize);

  res.send({
    list: cards,
    total: total,
  });
}

async function getRandomCards(req, res) {
  let { size } = req.query;
  size = +size || 10;

  let pipeline = [
    {
      $match: {},
    },
    {
      $sample: {
        size: size,
      },
    },
  ];
  let cards = await Card.aggregate(pipeline);

  res.send(cards);
}

async function createCard(req, res) {
  let card = new Card(req.body);
  await card.save();
  res.send(card);
}

async function updateCard(req, res) {
  let { id } = req.params;
  let { body } = req;
  let newCard = await Card.findOneAndUpdate({ _id: id }, body, { new: true });
  res.send(newCard);
}

async function deleteCard(req, res) {
  let { id } = req.params;
  let result = await Card.findByIdAndDelete(id);
  res.send(result);
}

module.exports = {
  getCards,
  getRandomCards,
  createCard,
  updateCard,
  deleteCard,
};
