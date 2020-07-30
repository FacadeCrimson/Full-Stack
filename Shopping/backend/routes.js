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
showRecords = require('./functions/getfunction')
fileUpload = require('./functions/fileupload')

//implement authentication
var jwtCheck = require('./functions/jwt')

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
envConfig = require('./env')[env]

//error catching function
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = function(app){
  router.get('/', function(req, res) {res.send('Hello World')})
  router.get('/customers', showRecords.allCustomers)
  router.get('/products', showRecords.allProducts)
  router.get('/search', catchAsync(showRecords.findProductByName))
  router.post('/img', upload.single('avatar'),fileUpload.upload)
  
  router.get('/test',jwtCheck,function (req, res, next) {
    res.send({"data":"OK"})
  })

  router.get('/check', jwtCheck, showRecords.findCustomerByEmail)
  router.post('/signup', jwtCheck, function (req, res, next) {
    console.log(req.body)
    res.send({"data":"OK"})})

  app.use('/', router)
}
