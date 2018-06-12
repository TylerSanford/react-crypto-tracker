const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

// router.get('/info/:btcAddress', function(req, res) {
//   const { btcAddress } = req.params;

  
// })

module.exports = router;