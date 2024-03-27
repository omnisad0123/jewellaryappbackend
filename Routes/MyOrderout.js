const express = require ('express');
const router = express.Router ();
const Order = require ('../Models/orderModel');

router.post ('/myOrderes', async (req, res) => {
  try {
    const userEmail = req.body.email; // Extract email from request body

    if (!userEmail) {
      return res.status (400).json ({error: 'Email is required.'});
    }

    const mydata = await Order.findOne ({email: userEmail});
    res.json ({orderedData: mydata});
  } catch (error) {
    console.error ('Server Error:', error.message);
    res.status (500).json ({error: 'Server Error'});
  }
});

module.exports = router;
