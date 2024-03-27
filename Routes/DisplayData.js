const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    // console.log(global.items);
    // console.log(global.foodcategory);
    res.send([global.items,foodcategory]);
    // res.send(global.foodcategory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
