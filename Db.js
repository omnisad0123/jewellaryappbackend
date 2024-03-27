
require("dotenv").config();
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const fetched_food = await mongoose.connection.db.collection('items');
    const fetched_category = await mongoose.connection.db.collection('foodcategory');
    const category_data = await fetched_category.find({}).toArray();
    const food_data = await fetched_food.find({}).toArray();

    // // Use the fetched data or do other operations here
    global.items = food_data;
    global.foodcategory = category_data;

    // Console log or perform other operations with the data
    // console.log(global.items);
    // console.log(global.foodcategory);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } 
};

module.exports = mongoDB;
