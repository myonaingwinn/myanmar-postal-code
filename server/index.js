const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Express API!😎');
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page

  const collection = client
    .db(process.env.DATABASE_NAME)
    .collection(process.env.COLLECTION_NAME);

  const query = {
    $or: [
      { Region: { $regex: keyword, $options: 'i' } },
      { 'Town / Township': { $regex: keyword, $options: 'i' } },
      { 'Quarter / Village Tract': { $regex: keyword, $options: 'i' } },
      { 'Postal Code': { $regex: keyword, $options: 'i' } },
    ],
  };

  collection
    .find(query)
    .project({
      _id: 0,
      Region: 1,
      'Town / Township': 1,
      'Quarter / Village Tract': 1,
      'Postal Code': 1,
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error('Failed to search data:', err);
      res.status(500).json({ error: 'An error occurred while searching data' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
