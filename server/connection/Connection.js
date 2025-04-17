const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const connectdb = async () => {
  await client.connect();
  const db = client.db("logdb");
  var collection = await db.collection("Udata")
  return collection
};
module.exports = connectdb
