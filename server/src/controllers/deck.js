const db = require('../models');

async function getDecks(req, res) {
    const result = await db.Deck.find({});
    res.send(result);
}
async function createDeck(req, res) {
    const deck = new db.Deck(req.body);
    const result = await deck.save();
    res.send(result);
}

async function updateDeck (req, res) {
    const { id } = req.params;
    const { body } = req;
    const update = {$set: {}};
    const keys = Object.keys(body);
    keys.forEach((k) => {
        update.$set[k] = body[k];
    })
    const result= await db.Deck.findByIdAndUpdate(id, udpate);
    res.send(result);
}

async function deleteDeck() {
    const { id } = req.params;
    const result = await db.Deck.findByIdAndRemove(id);
    res.send(result);
}


module.exports = {
    getDecks,
    createDeck,
    updateDeck,
    deleteDeck,
};
