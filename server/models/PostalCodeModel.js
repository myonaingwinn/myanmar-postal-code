const { MongoClient } = require('mongodb');
const { LANGUAGE } = require('../enums');

class PostalCode {
  constructor(language, page = 1, pageSize = 10) {
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
    const { client } = await this.getClientOrDB();

    try {
      await client.connect();

      const { db } = await this.getClientOrDB();
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
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  }

  async searchWithPagination(
    collection,
    query,
    page,
    pageSize,
    isFirstCall = true
  ) {
    let result = await collection
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (result.length < 1 && isFirstCall) {
      result = await this.searchWithPagination(
        collection,
        query,
        1,
        pageSize,
        false
      );
      this.page = 1;
    }

    return result;
  }

  async getClientOrDB() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbName = process.env.DATABASE_NAME;
    const db = client.db(dbName);

    return { client, db };
  }

  async ordinarySearch(query) {
    const { client } = await this.getClientOrDB();
    await client.connect();
    const { db } = await this.getClientOrDB();
    const collection = db.collection(this.collectionName);

    try {
      let regionList = [];
      let townList = [];
      let quarterList = [];
      let postalCode = '';

      // get region
      if (query.regionColumn) {
        regionList = await collection.distinct(query.regionColumn);
      }

      // get township
      if (query.region) {
        const cursor = collection.aggregate([
          { $match: { Region: query.region } },
          { $group: { _id: '$Town / Township' } },
          { $project: { _id: 0, town: '$_id' } },
          { $sort: { town: 1 } },
        ]);

        const cursorArr = await cursor.toArray();
        townList = cursorArr.map((item) => item.town);

        // get quarter
        if (query.town) {
          const cursor = collection.aggregate([
            {
              $match: {
                Region: query.region,
                'Town / Township': query.town,
              },
            },
            { $group: { _id: '$Quarter / Village Tract' } },
            { $project: { _id: 0, quarter: '$_id' } },
            { $sort: { quarter: 1 } },
          ]);

          const cursorArr = await cursor.toArray();
          quarterList = cursorArr.map((item) => item.quarter);

          // get postal code
          if (query.quarter) {
            const pstlCode = await collection.findOne(
              {
                Region: query.region,
                'Town / Township': query.town,
                'Quarter / Village Tract': query.quarter,
              },
              {
                projection: { 'Postal Code': 1 },
              }
            );

            postalCode = pstlCode['Postal Code'];
          }
        }
      }

      return {
        regionList: regionList,
        townList: townList,
        quarterList: quarterList,
        postalCode: postalCode,
      };
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  }
}

module.exports = PostalCode;
