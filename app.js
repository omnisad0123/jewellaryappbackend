require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoDB = require('./Db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT||4000;

mongoDB();

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: 'di9tuayhz',
  api_key: '371743922548799',
  api_secret: 'xq5qUkUbBfsFLQTFTSAQTiwzUHA',
});

const uploadImages = async () => {
  try {
    const directoryPath = 'E:/Desktop/Documents/photots/WhatsApp Images/WhatsApp Images/Aaryan jewells';
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const result = await cloudinary.uploader.upload(filePath, { public_id: file });
      // console.log(`Uploaded ${file}: ${result.secure_url}`);
    }
  } catch (error) {
    console.error(`Error uploading images: ${error.message}`);
  }
};

// uploadImages(); // Uncomment if you want to upload images on server start

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const createUserRoute = require('./Routes/CreateUser');
app.use('/users', createUserRoute);
app.use('/users', require('./Routes/DisplayData'));
app.use('/users', require('./Routes/orderedData'));
app.use('/users', require('./Routes/MyOrderout'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
