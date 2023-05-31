const { MongoClient } = require('mongodb');
const LANGUAGE = require('../enums/LANGUAGE');

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
        collectionLanguage = LANGUAGE.EN;
        break;
      case LANGUAGE.MM:
        collectionLanguage = LANGUAGE.MM;
        break;
      default:
        collectionLanguage = LANGUAGE.EN; // Default to English
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

      const result = await this.searchWithPagination(
        collection,
        query,
        this.page,
        this.pageSize
      );

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

  async searchWithPagination(collection, query, page, pageSize) {
    let result = await collection
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (result.length < 1) {
      result = await this.searchWithPagination(collection, query, 1, pageSize);
      this.page = 1;
    }

    return result;
  }
}

module.exports = PostalCode;
