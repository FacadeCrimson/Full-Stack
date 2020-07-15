const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/test'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

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

  const authorModel = mongoose.Schema({
    name: { 
     type: String, 
     required: '{PATH} is required!'
    },
    bio: {
     type: String
    },
    website: {
     type: String
    },
    books: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
    ]
  }, {
    timestamps: true
  });
  

// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
    this.name = this.name + '-dude'; 
  
    return this.name;
  };
  
  var User = mongoose.model('User', userSchema)
  var Author = mongoose.model('Author',authorModel)

  module.exports = {
    'User': User,
    'Author': Author,
  };