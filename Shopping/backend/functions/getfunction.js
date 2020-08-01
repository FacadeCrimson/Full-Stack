const {Customer,Product} = require('../models')
const AppError = require('./error')

const getFunctions = {
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
    const products =await Product.find({"name":req.query.name})
    if (products.length===0) {
      return next(new AppError('No products found with that name.', 404))
     }
    res.send(products[0])
  },

  async allCustomers(req, res, next){
    const customers =await Customer.find()
    res.send(customers)
  },

  async findCustomerByEmail(req, res, next){
    const customers =await Customer.find({"Email":req.query.email})
    if (customers.length===0) {
      return next(new AppError('No customers found with that email.', 404))
     }
    res.send(customers[0])
  }
}

module.exports = getFunctions

// var monthAgo = new Date();
// monthAgo.setMonth(monthAgo.getMonth() - 1);
// User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
//   if (err) throw err;
//   console.log(users);
// });

// User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {});

// User.findOneAndRemove({ username: 'starlord55' }, function(err) {});

// User.findByIdAndRemove(4, function(err) {});