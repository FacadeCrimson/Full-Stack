const express = require('express')
router = express.Router()

// file upload
var multer = require('multer')
var upload = multer({ dest: './public/img/' })

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