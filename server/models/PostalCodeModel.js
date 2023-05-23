const { MongoClient } = require('mongodb');

const LANGUAGE = Object.freeze({
  EN: 'en',
  MM: 'mm',
});

class PostalCode {
  constructor(language, page, pageSize) {
    this.collectionName = this.getCollectionName(language);
    this.page = page;
    this.pageSize = pageSize;
  }

  getCollectionName(language) {
    const collectionPrefix = 'postal_codes';
    let collectionLanguage = '';

    switch (language) {
      case LANGUAGE.EN:
        collectionLanguage = 'en';
        break;
      case LANGUAGE.MM:
        collectionLanguage = 'mm';
        break;
      default:
        collectionLanguage = 'en'; // Default to English
        break;
    }

    return `${collectionPrefix}_${collectionLanguage}`;
  }

  async find(query) {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(this.collectionName);

      const count = await collection.countDocuments(query);

      const result = await collection
        .find(query)
        .skip((this.page - 1) * this.pageSize)
        .limit(this.pageSize)
        .toArray();

      return {
        totalItems: count,
        data: result,
        currentPage: this.page,
        pageSize: this.pageSize,
      };
    } finally {
      await client.close();
    }
  }
}

module.exports = PostalCode;
