const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const AppError = require('./functions/error')
require('dotenv').config()

const redis = require('redis')
var client = redis.createClient(process.env.RDS_PORT, process.env.RDS_HOST, {no_ready_check: true})
// auth_pass:process.env.RDS_PWD
// client.auth(process.env.RDS_PWD, function (err) {
//     console.log(err)
// })

client.on('error', function (err) {
    console.log('Error ' + err)
})
client.on('connect', function() {
    console.log('Connected to Redis')
})


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride())

var corsOptions = {
    origin: process.env.FRONTEND,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND)
  res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE")
  res.header('Access-Control-Allow-Headers', 'Authorization')
  next()
}
app.use(allowCrossDomain)
app.use(express.static('public'))

require('./routes')(app)

//error handler
app.use(function(req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
})
  
app.listen(process.env.PORT)