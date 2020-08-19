const {Customer,Product} = require('../models')
const AppError = require('./error')

const getFunctions = {

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
    const customer =await Customer.findOne({"Email":req.query.email})
    if (!customer) {
      return next(new AppError('No customers found with that email.', 404))
     }
    await customer.populate({
      path: 'history',
      select: 'name img price ratings'
    }).populate({
      path: 'cart',
      populate:{
        path:'product_id',
        select: 'name img price ratings',
      }
    }).execPopulate()
    res.json({"username":customer.Username,"history":customer.history,"cart":customer.cart})
  },

  async getCart(req, res, next){
    const customer =await Customer.findOne({"Email":req.query.email})
    if (!customer) {
      return next(new AppError('No customers found with that email.', 404))
     }
     await customer.populate({
      path: 'cart',
      populate:{
        path:'product_id',
        select: 'name img price ratings',
      }
    }).execPopulate()
    res.json(customer.cart)
  },
}

module.exports = getFunctions