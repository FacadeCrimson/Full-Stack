const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
envConfig = require('./env')[env]

mongoose.connect(envConfig.db, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', function () {  
  console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on('error',function (err) {  
  console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {  
  console.log('Connection disconnected'); 
});

var Schema = mongoose.Schema

// create a schema
var customerSchema = new Schema({
    name: { type: String, required: true},
    gender: { type: String, required: true},
    email:{ type: String, required: true, unique: true, index: true },
    phone:{ type: String, required: true, unique: true },
    address:{ type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
      orders:[
        {time:{ type: Date,},
         products:[{
          product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
          name:{ type: String, required: true},
          quantity:{ type: Number, required:true},
        }]
        }],
      history:[{product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
  },{timestamps: true})

// customerSchema.pre('save', function(next) {
//   var currentDate = new Date();
//   this.updated_at = currentDate;
//   if (!this.created_at)
//     this.created_at = currentDate;
//   next()
// })

// you can create more important methods like name validations or formatting
// you can also do queries and find similar customers 
customerSchema.methods.dudify = function() {
    this.name = this.name + '-dude'
    return this.name
  }
  
var productModel = mongoose.Schema({
    category:{ type: String, required: true},
    tag:[{ type: String}],
    name: { type: String, required: true },
    img:  { type: String, required: true, default:"/img/no-image.png" },
    price: { type: Number, required: true },
    ratings:[{type: Number}],
    info:{
      size: { type: String },
      weight: { type: String },
      description:{ type: String },
      other:{ type: String },
    },
    comments:[
      {customer_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
      name:{ type: String, required: true},
      time: { type: Date, required: true},
      content:{ type: String },
    }]
    }, {
    timestamps: true
  })
  
  var Customer = mongoose.model('Customer', customerSchema)
  var Product = mongoose.model('Product',productModel)

  module.exports = {
    'Customer': Customer,
    'Product': Product,
  };