const router = require('express').Router();
const cardCtrl = require('./card');

router.get('/cards', cardCtrl.getCards);
router.get('/random-cards', cardCtrl.getRandomCards);
router.post('/cards', cardCtrl.createCard);
router.put('/cards/:id', cardCtrl.updateCard);
router.delete('/cards/:id', cardCtrl.removeCard);
router.delete('/cards', cardCtrl.removeCards);

module.exports = router;
