const router = require('express').Router();
const deckCtrl = require('./deck');

router.get('/decks', deckCtrl.getDecks);
router.post('/decks', deckCtrl.createDeck);
router.put('/decks/:id', deckCtrl.updateDeck);
router.delete('/decks/:id', deckCtrl.deleteDeck);

router.get('/decks/:id/cards', deckCtrl.getCards);
router.get('/decks/:id/random-cards', deckCtrl.getRandomCards);
router.post('/decks/:id/cards', deckCtrl.createCard);
router.put('/decks/:deckId/cards/:cardId', deckCtrl.updateCard);
router.delete('/decks/:deckId/cards/:cardId', deckCtrl.deleteCard);

module.exports = router;
