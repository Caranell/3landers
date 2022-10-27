const { MongoClient } = require('mongodb');

const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb://10.0.0.10:27017';
const DB_NAME = 'Profiles';

let dbConnection;
const client = new MongoClient(CONNECTION_URL, {
  useUnifiedTopology: true,
});

module.exports = {
  connectToDB: async () => {
    const connection = await client.connect();
    dbConnection = connection.db(DB_NAME);
    return client;
  },
  getDbConnection: () => dbConnection,
};
