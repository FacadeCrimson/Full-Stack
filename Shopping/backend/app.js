const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
var cookieParser = require('cookie-parser')

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

app.listen(envConfig.port)