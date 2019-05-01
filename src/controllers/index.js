const router = require('express').Router();
const deckCtrl = require('./deck');
const cardCtrl = require('./card2');
const tagCtrl = require('./tag');
const cacheCtrl = require('./cache')

router.get('/decks', deckCtrl.getDecks);
router.post('/decks', deckCtrl.createDeck);
router.put('/decks/:id', deckCtrl.updateDeck);
router.delete('/decks/:id', deckCtrl.deleteDeck);

router.get('/decks/:id/cards', deckCtrl.getCards);
router.get('/decks/:id/random-cards', deckCtrl.getRandomCards);
router.post('/decks/:id/cards', deckCtrl.createCard);
router.put('/decks/:deckId/cards/:cardId', deckCtrl.updateCard);
router.delete('/decks/:deckId/cards/:cardId', deckCtrl.deleteCard);

router.get('/v2/cards', cacheCtrl.getCards, cardCtrl.getCards);
router.get('/v2/random-cards', cardCtrl.getRandomCards);
router.post('/v2/cards', cardCtrl.createCard);
router.put('/v2/cards/:id', cardCtrl.updateCard);
router.delete('/v2/cards/:id', cardCtrl.deleteCard);

router.get('/v2/tags', tagCtrl.getTags);
router.post('/v2/tags', tagCtrl.createTag);
router.put('/v2/tags/:id', tagCtrl.updateTag);
router.delete('/v2/tags/:id', tagCtrl.deleteTag);

module.exports = router;
