

const express = require('express')
router = express.Router(),
// require functions from subroute files
AuthorsController = require('./subroute1/function')


module.exports = function(app){
  router.get('/authors', AuthorsController.index);
  router.get('/authors/:id', AuthorsController.show);
};