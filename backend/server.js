const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

//connection to the database
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

//database and app
const dbName = process.env.MONGO_DB;
const app = express()
const port = 3000

//middlewares
app.use(bodyparser.json())
app.use(cors())

//fetching data from the database
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult)
})

//inserting data into the database
app.post('/', async(req, res) => {
  const data=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertResult = await collection.insertOne(data);
  res.send({success:true,insertResult})
})

//deleting data from the database
app.delete('/', async(req, res) => {
  const data=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertResult = await collection.deleteOne(data);
  res.send({success:true})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})