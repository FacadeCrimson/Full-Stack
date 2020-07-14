
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var User = require('./models.js')

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


  // grab the user model
var User = require('./app/models/user');

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

  // get a user with ID of 1
User.findById(1, function(err, user) {
    if (err) throw err;
  
    // show the one user
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


// get a user with ID of 1
User.findById(1, function(err, user) {
    if (err) throw err;
  
    // change the users location
    user.location = 'uk';
  
    // save the user
    user.save(function(err) {
      if (err) throw err;
  
      console.log('User successfully updated!');
    });
  
  });

  
  // find the user starlord55
// update him to starlord 88
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
    if (err) throw err;
  
    // we have the updated user returned to us
    console.log(user);
  });


  // find the user with id 4
// update username to starlord 88
User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {
    if (err) throw err;
  
    // we have the updated user returned to us
    console.log(user);
  });


  // get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
    if (err) throw err;
  
    // delete him
    user.remove(function(err) {
      if (err) throw err;
  
      console.log('User successfully deleted!');
    });
  });


  // find the user with id 4
User.findOneAndRemove({ username: 'starlord55' }, function(err) {
    if (err) throw err;
  
    // we have deleted the user
    console.log('User deleted!');
  });


  // find the user with id 4
User.findByIdAndRemove(4, function(err) {
    if (err) throw err;
  
    // we have deleted the user
    console.log('User deleted!');
  });



app.listen(5000, function() {
    console.log('listening on 3000')
  })

app.get('/', function(req, res) {
    res.send('Hello World')
})


// const product = require('./routes/product.route'); // Imports routes for the products

// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/products', product);