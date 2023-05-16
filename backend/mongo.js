import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


app.get('/data', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('data');
    const collection = database.collection('data');
    const query = { $and: [{ temp: { $exists: true } }, { timestamp: { $exists: true } }, { location: { $exists: true } }] };
    const options = { projection: { _id: 0, temp: 1, timestamp: 1, location: 1 } };
    const cursor = collection.find(query, options);

    const results = await cursor.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342'); // set the CORS header
    res.send(JSON.stringify(results));
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
