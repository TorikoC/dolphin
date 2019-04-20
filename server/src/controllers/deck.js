const db = require('../models');

async function getCards(req, res) {
  let { id } = req.params;
  let cards = [];
  async function findDeck(id) {
    let deck = await db.Deck.findById(id);
    cards = cards.concat(deck.cards);
    if (deck.children.length < 1) {
      return;
    }
    deck.children.forEach(d => {
      findDeck(d._id);
    });
  }
  await findDeck(id);
  res.send(cards);
}

async function createCard(req, res) {
  let { id } = req.params;
  let card = new db.Card(req.body);
  let deck = await db.Deck.findById(id);
  deck.cards.push(card);
  await deck.save();
  res.send(deck);
}
async function updateCard(req, res) {
  let { deckId, cardId } = req.params;
  let { body } = req;
  let deck = await db.Deck.findOneAndUpdate(
    { _id: deckId, 'cards._id': cardId },
    {
      $set: {
        'cards.$': body,
      },
    },
  );
  res.send(deck);
}

async function deleteCard(req, res) {
  let { deckId, cardId } = req.params;
  let deck = await db.Deck.findById(deckId);
  console.log(deckId, cardId, deck);
  let card = deck.cards.id(cardId);
  await card.remove();
  await deck.save();
  res.send(deck);
}

async function getDecks(req, res) {
  let decks = await db.Deck.find();
  res.send(decks);
}

async function updateDeck(req, res) {
  let { id } = req.params;
  let body = req.body;
  let result = await db.Deck.findByIdAndUpdate(id, body);
  res.send(result);
}

async function createDeck(req, res) {
  let deck = new db.Deck(req.body);
  let result = await deck.save();
  res.send(result);
}

async function deleteDeck(req, res) {
  let { id } = req.params;
  let result = await db.Deck.findByIdAndDelete(id);
  res.send(result);
}

module.exports = {
  getDecks,
  createDeck,
  updateDeck,
  deleteDeck,

  getCards,
  createCard,
  updateCard,
  deleteCard,
};
