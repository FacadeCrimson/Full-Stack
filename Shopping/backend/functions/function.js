const {Customer,Product} = require('../models')
const AppError = require('./error')

const showRecords = {
  async index(req, res){
    const products = await Product
       .find()
       .populate('books')
    res.send(products)
  },

  async allProducts(req, res, next){
    const products =await Product.find()
    res.send(products)
  },

  async findProductByName(req, res, next){
    const products =await Product.find({"name":req.body.name})
    if (products.length===0) {
      return next(new AppError('No tour found with that ID', 404))
     }
    res.send(products)
    // res.status(201).json({
    //   status: 'success',
    //   products:products
    // })
  },

  async allCustomers(req, res, next){
    const customers =await Customer.find()
    res.send(customers)
  },

  async findCustomerByName(req, res, next){
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