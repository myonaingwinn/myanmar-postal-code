const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const PostalCode = require('./models/PostalCodeModel');
const getLanguage = require('./utils/getLanguage');
const { COLUMNS } = require('./enums');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://mm-postal-code.vercel.app',
  process.env.ALLOWED_ORIGIN,
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

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

app.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const language = getLanguage(keyword);
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page

    if (!keyword || !keyword.trim().length > 0) {
      // If keyword is missing or not valid, return an error response
      return res.status(400).json({ error: 'Invalid keyword' });
    }

    const postalCode = new PostalCode(language, page, pageSize);

    const query = {
      $or: [
        { Region: { $regex: keyword, $options: 'i' } },
        { 'Town / Township': { $regex: keyword, $options: 'i' } },
        { 'Quarter / Village Tract': { $regex: keyword, $options: 'i' } },
        { 'Postal Code': { $regex: keyword, $options: 'i' } },
      ],
    };

    const results = await postalCode.find(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while searching data. Please try again.',
    });
  }
});

app.get('/ordinarySearch', async (req, res) => {
  try {
    const { regionColumn, region, town, quarter, language } = req.query;
    console.log(
      '🚀 ~ file: index.js:81 ~ app.get ~ regionColumn, region, town, quarter, language:',
      regionColumn,
      region,
      town,
      quarter,
      language
    );

    if (!Object.values(COLUMNS).includes(regionColumn)) {
      // If keyword is missing or not valid, return an error response
      return res
        .status(400)
        .json({ error: 'Invalid parameters. Please try again.' });
    }

    let query = {};
    if (regionColumn) query.regionColumn = regionColumn;
    if (region) query.region = region;
    if (town) query.town = town;
    if (quarter) query.quarter = quarter;

    const postalCode = new PostalCode(language);

    const results = await postalCode.ordinarySearch(query);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while searching data. Please try again.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
