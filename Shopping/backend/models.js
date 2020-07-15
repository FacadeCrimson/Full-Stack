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
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
      age: Number,
      website: String
    },
    created_at: Date,
    updated_at: Date
  })

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next()
})

// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
    this.name = this.name + '-dude'
    return this.name
  }
  
var authorModel = mongoose.Schema({
    name: { type: String, required: '{PATH} is required!' },
    bio: { type: String },
    website: { type: String },
    books: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    }, {
    timestamps: true
  })
  
  var User = mongoose.model('User', userSchema)
  var Author = mongoose.model('Author',authorModel)

  module.exports = {
    'User': User,
    'Author': Author,
  };