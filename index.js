const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const password ='b3Xa*!7Qt98aCv7'

const uri = "mongodb+srv://organicUser:b3Xa*!7Qt98aCv7@cluster0.vtemd.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

app.get('/', (req, res) =>{
    res.send('hello i m working')
})





client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  const product = {name: "modhu",price: 25 ,quantity: 20};

  collection.insertOne(product)
  .then(result =>{
    console.log('one product added' );
  })
  // perform actions on the collection object
  console.log('database connected')
  //client.close();
});


app.listen(3000);