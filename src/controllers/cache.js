let redis = require('redis')
let client = redis.createClient({
  port: 6379
})

async function getCards(req, res, next) {
  let { page, tags, poll } = req.query
  page = +page || 1;
  let key = `cards:${tags ? tags : 'a'}:${poll ? 1 : 0}:${page}`;
  client.get(key, (err, reply) => {
    if (err) {
      return err;
    }
    if (reply) {
      res.send(reply);
    } else {
      next();
    }
  })
}

module.exports = {
  getCards,
} 