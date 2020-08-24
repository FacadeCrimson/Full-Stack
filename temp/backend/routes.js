redisFunctions=require('./functions/checkredis')

const express = require('express')
router = express.Router()

//error catching function
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = function(app){
  router.get('/', function(req,res){res.send("Hello World!")})

  app.use('/', router)
}