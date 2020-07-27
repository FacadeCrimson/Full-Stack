const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const AppError = require('./functions/error')

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
envConfig = require('./env')[env]

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var corsOptions = {
    origin: envConfig.frontend,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(methodOverride())
app.use(cookieParser())
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
  
app.listen(envConfig.port)