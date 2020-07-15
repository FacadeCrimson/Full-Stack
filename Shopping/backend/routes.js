const express = require('express')
router = express.Router()
// require functions from subroute files
showRecords = require('./subroute1/function')

module.exports = function(app){
  router.get('/', function(req, res) {res.send('Hello World')})
  router.get('/users', showRecords.findAll)
  router.get('/searchuser', showRecords.findByName)
  router.get('/authors/:id', showRecords.show)
  app.use('/', router)
};