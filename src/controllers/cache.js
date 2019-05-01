let redis = require('redis')
let { logger } = require('../lib/logger')
let client = redis.createClient({
  port: 6379
})

async function getCards(req, res, next) {
  let { page, tags, poll } = req.query
  page = +page || 1;
  let key = `cards:${tags ? tags : 'a'}:${poll ? 1 : 0}:${page}`;

  logger.info(req.url, req.query)

  client.get(key, (err, reply) => {
    if (err) {
      return err;
    }
    logger.info(`Cache KEY ${key}`)
    if (reply) {
      logger.info(`Cache HIT`)
      res.send(reply);
    } else {
      logger.info(`Cache NOT HIT`)
      next();
    }
  })
}

module.exports = {
  getCards,
} 