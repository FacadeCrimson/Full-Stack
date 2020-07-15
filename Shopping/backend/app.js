
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
var cookieParser = require('cookie-parser');
const {User,Author} = require('./models')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
require('./routes')(app)


const mongoose = require('mongoose'),
  env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  envConfig = require('../server/env')[env];
mongoose.Promise = require('bluebird');
mongoose.connect(envConfig.db, { useMongoClient: true, });
mongoose.connection.on('connected', function () {  
  console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});


// create a new user called chris
var chris = new User({
  name: 'Chris',
  username: 'sevilayha',
  password: 'password' 
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
chris.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });

// create a new user
var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});

// get all the users
User.find({}, function(err, users) {
    if (err) throw err;
  
    // object of all the users
    console.log(users);
  });

  // get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
    if (err) throw err;
  
    // object of the user
    console.log(user);
  });
  
// get any admin that was created in the past month
// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;

  // show the admins in the past month
  console.log(users);
});


// User.findById

// User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {});

// User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {});

// User.findOneAndRemove({ username: 'starlord55' }, function(err) {});

// User.findByIdAndRemove(4, function(err) {});



app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('App listening on port 5000, with 2 routers, yayyy !')
  }
});

app.get('/', function(req, res) {
    res.send('Hello World')
})