const {Customer,Product} = require('../models')

const showRecords = {
  async index(req, res){
    const products = await Product
       .find()
       .populate('books')
    res.send(products)
  },

  async show(req, res){
    const product = await Product
       .findById(req.params.id)
       .populate('books')
    res.send(product)
  },

  async findAll(req,res){
    const customers =await Customer.find()
    res.send(customers)
  },

  async findByName(req,res){
    const customers =await Customer.find({"name":req.body.name})
    res.send(customers)
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