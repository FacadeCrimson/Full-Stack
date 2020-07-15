const {User,Author} = require('../models')

const showRecords = {
  async index(req, res){
    const authors = await Author
       .find()
       .populate('books')
    res.send(authors)
  },

  async show(req, res){
    const author = await Author
       .findById(req.params.id)
       .populate('books')
    res.send(author)
  },

  async findAll(req,res){
    const users =await User.find()
    res.send(users)
  },

  async findByName(req,res){
    const users =await User.find({"name":req.body.name})
    res.send(users)
  }
}

module.exports = showRecords

// var monthAgo = new Date();
// monthAgo.setMonth(monthAgo.getMonth() - 1);
// User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
//   if (err) throw err;
//   console.log(users);
// });

// User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {});

// User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {});

// User.findOneAndRemove({ username: 'starlord55' }, function(err) {});

// User.findByIdAndRemove(4, function(err) {});