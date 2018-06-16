const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig.js');

router.get('/api', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

router.get('/api/btcAddress', (req, res) => {

  db('btc_address_list')
    .then((records) => {
      res.status(200).json(records);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Database is empty..', err })
    })
})

router.post('/api/btcAddress/:address', (req, res) => {
  const address = req.params;

  db('btc_address_list')
    .insert(address)
    .then((records) => {
      res.status(200).json(records);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Could not add btc address to db',
        err,
      });
    })
})

module.exports = router;