
import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://rajuk631149_db_user:rajuk631149_db_user>@mainthunder.2ikce3w.mongodb.net/");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}