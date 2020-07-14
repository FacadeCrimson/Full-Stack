const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/shopping'

const express = require('express');
const app = express();

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
    const db = client.db('shopping')
    const collection = db.collection('customer')


    collection.insertOne({name: 'Roger'}, (err, result) => {

    })
    collection.insertMany([{name: 'Togo'}, {name: 'Syd'}], (err, result) => {

    })

    collection.find().toArray((err, items) => {
        console.log(items)
    })
    db.close()
})

app.listen(3000, function() {
    console.log('listening on 3000')
  })

app.get('/', function(req, res) {
    res.send('Hello World')
})