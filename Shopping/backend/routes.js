const fs=require('fs')
const path= require('path')
const express = require('express')
router = express.Router()

// file upload
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir=`./public/img/${req.body.category}/`
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir)}
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.imgname}` + path.extname(file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage })

// require functions from files
getFunctions = require('./functions/getfunction')
postFunctions = require('./functions/postfunction')
fileUpload = require('./functions/fileupload')

//implement authentication
var jwtCheck = require('./functions/jwt')

//error catching function
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = function(app){
  router.get('/', function(req,res){res.send("Hello World!")})
  router.get('/customers', getFunctions.allCustomers)
  router.post('/img', upload.single('avatar'),fileUpload.upload)
  
  router.get('/allproducts', catchAsync(getFunctions.allProducts))
  router.get('/productinfo', catchAsync(getFunctions.findProductByName))
  router.get('/check', jwtCheck, getFunctions.findCustomerByEmail)
  router.get('/getcart',jwtCheck, getFunctions.getCart)

  router.post('/signup', jwtCheck, catchAsync(postFunctions.signUp))
  router.post('/history',postFunctions.recordHistory)
  router.post('/comment',jwtCheck, postFunctions.comment)
  router.post('/cart',jwtCheck, postFunctions.cart)
  router.post('/removeitem',jwtCheck, postFunctions.removeItem)

  app.use('/', router)
}
