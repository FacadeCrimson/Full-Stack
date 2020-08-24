require('dotenv').config()

const database = "mongodb+srv://"+process.env.DBUSER+":"+process.env.DBPASSWORD+"@cluster0.jpxdz.mongodb.net/"+process.env.DBNAME+"?retryWrites=true&w=majority"

// Prisma connection
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// var Schema = mongoose.Schema
// create a schema
// var customerSchema = new Schema({
//     Name: { type: String, required: true },
//     Gender: { type: String, required: true },
//     Email:{ type: String, required: true, unique: true, index: true },
//     Phone:{ type: String, required: true },
//     Address:{ type: String, required: true },
//     Username: { type: String, required: true, unique: true, index: true },
//     Birthday: {type:Date,required: true},
//       orders:[
//         {time:{ type: Date,},
//          products:[{
//           product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//           name:{ type: String, required: true},
//           quantity:{ type: Number, required:true},
//         }]
//         }],
//       history:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
//       cart:[{
//         product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//         name:{ type: String, required: true},
//         quantity:{ type: Number, required:true},
//       }]
//   },{timestamps: true})

// customerSchema.pre('save', function(next) {
//   var currentDate = new Date();
//   this.updated_at = currentDate;
//   if (!this.created_at)
//     this.created_at = currentDate;
//   next()
// })

// you can create more important methods like name validations or formatting
// you can also do queries and find similar customers 
// customerSchema.methods.dudify = function() {
//     this.name = this.name + '-dude'
//     return this.name
//   }
  
// var productModel = mongoose.Schema({
//     category:{ type: String, required: true},
//     tag:[{ type: String}],
//     name: { type: String, required: true },
//     img:  { type: String, required: true, default:"/img/no-image.png" },
//     price: { type: Number, required: true },
//     ratings:[{type: Number}],
//     info:{
//       size: { type: String },
//       weight: { type: String },
//       description:{ type: String },
//       other:{ type: String },
//     },
//     comments:[
//       {customer_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
//       name:{ type: String, required: true},
//       time: { type: Date, required: true},
//       content:{ type: String },
//     }]
//     }, {
//     timestamps: true
//   })
  
//   var Customer = mongoose.model('Customer', customerSchema)
//   var Product = mongoose.model('Product',productModel)

  module.exports = {
    'Customer': Customer,
    'Product': Product,
  };