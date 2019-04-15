const router = require('express').Router();
const cardCtrl = require('./card');
const deckCtrl = require('./deck');

router.get('/cards', cardCtrl.getCards);
router.get('/random-cards', cardCtrl.getRandomCards);
router.post('/cards', cardCtrl.createCard);
router.put('/cards/:id', cardCtrl.updateCard);
router.delete('/cards/:id', cardCtrl.removeCard);
router.delete('/cards', cardCtrl.removeCards);

router.get('/decks', deckCtrl.getDecks);
router.post('/decks', deckCtrl.createDeck);
router.put('/decks/:id', deckCtrl.updateDeck);
router.delete('/decks/:id', deckCtrl.deleteDeck);

module.exports = router;
