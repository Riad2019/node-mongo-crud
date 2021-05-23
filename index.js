const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const password ='b3Xa*!7Qt98aCv7'

const uri = "mongodb+srv://organicUser:PnaoiMXtkhfHLa1G@cluster0.vtemd.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) =>{
    res.sendFile(__dirname+'/index.html');
})

client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
   
  app.get('/products',(req, res) => {

    productCollection.find({})
    .toArray((err,documents) => {
      res.send(documents);
    })
  })


  app.get('/product/:id',(req, res) => {

    productCollection.find({_id: ObjectId (req.params.id)})
    .toArray((err,documents) => {
      res.send(documents[0]);
    })
  })

  app.post("/addProduct",(req,res) =>{
   const product =req.body;
   productCollection.insertOne(product)
  
   .then(result =>{
    console.log('one product added' );
    res.send('successfully');
  })

  
  
  })
  // perform actions on the collection object
  console.log('database connected')
  //client.close();


  app.patch('/update/:id', (req, res) =>
  {
    productCollection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price:req.body.price, quantity:req.body.quantity}
    })
    .then(result =>{
      console.log(result);
    })
  })

  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
      console.log(result);
    })
  })





});

app.listen(3000);