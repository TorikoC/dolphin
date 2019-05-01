let Card = require('../models/Card2');
let redis = require('redis').createClient({
  prot: 6379
})

async function getCards(req, res) {

  let { page, pageSize, tags, sort, poll } = req.query;

  let cond = {};
  if (tags) {
    tags = tags.split(',');
    cond.tags = {
      $in: tags,
    };
  }
  page = +page || 1;
  pageSize = +pageSize || 20;

  let skip = (page - 1) * pageSize;
  let p1 = Card.find(cond)
    .skip(skip)
    .limit(pageSize);
  let p2 = Card.find(cond).count();
  if (sort) {
    let [field, key] = sort.split('|');
    let sortCond = {};
    sortCond[field] = key.toLowerCase() === 'desc' ? -1 : 1;
    p1.sort(sortCond);
  }
  if (poll) {
    p1.populate('tags');
  }

  let results = await Promise.all([p1, p2]);
  let cards = results[0];
  let total = results[1];
  total =
    total % pageSize === 0 ? total / pageSize : Math.ceil(total / pageSize);

  let result = {
    list: cards,
    total: total,
  }
  let key = `cards:${tags ? tags.join(',') : 'a'}:${poll ? 1 : 0}:${page}`;
  redis.set(key, JSON.stringify(result));
  res.send(result);
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
  cleanCache();
  res.send(card);
}

async function updateCard(req, res) {
  let { id } = req.params;
  let { body } = req;
  let newCard = await Card.findOneAndUpdate({ _id: id }, body, { new: true });
  cleanCache();
  res.send(newCard);
}

async function deleteCard(req, res) {
  let { id } = req.params;
  let result = await Card.findByIdAndDelete(id);
  cleanCache();
  res.send(result);
}

function cleanCache() {
  redis.keys('cards*', (err, reply) => {
    if (err) {
      return;
    }
    if (!reply || !(reply instanceof Array)) {
      return;
    }
    reply.forEach((key) => {
      redis.del(key)
    })
  })
}

module.exports = {
  getCards,
  getRandomCards,
  createCard,
  updateCard,
  deleteCard,
};
