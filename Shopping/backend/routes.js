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

// require functions from subroute files
showRecords = require('./functions/function')
fileUpload = require('./functions/fileupload')

module.exports = function(app){
  router.get('/', function(req, res) {res.send('Hello World')})
  router.get('/customers', showRecords.findAll)
  router.get('/searchcustomer', showRecords.findByName)
  router.get('/products/:id', showRecords.show)
  router.post('/img', upload.single('avatar'),fileUpload.upload)
  app.use('/', router)
}