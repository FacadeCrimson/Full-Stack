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
showRecords = require('./functions/function')
fileUpload = require('./functions/fileupload')
var secured = require('./functions/secured')

//implement authentication
var passport = require('passport')
var util = require('util')
var url = require('url')
var querystring = require('querystring')

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
envConfig = require('./env')[env]

module.exports = function(app){
  router.get('/', function(req, res) {res.send('Hello World')})
  router.get('/customers', showRecords.findAll)
  router.get('/searchcustomer', showRecords.findByName)
  router.get('/products', showRecords.allProducts)
  router.post('/img', upload.single('avatar'),fileUpload.upload)
  
  //user page secured: get user profile
  router.get('/user', secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user
      res.send(JSON.stringify(userProfile, null, 2))
  })

  // Perform the login, after login Auth0 will redirect to callback
  router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/')
    
  })

  router.get('/test',function (req, res, next) {
    res.send("OK")
    console.log(req.session.login)
  })

  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err)}
      if (!user) { return res.redirect('/login')}
      req.logIn(user, function (err) {
        if (err) { return next(err)}
        const returnTo = req.session.returnTo
        delete req.session.returnTo
        res.redirect(returnTo || envConfig.frontend)
      })
    })(req, res, next)
  })

  // Perform session logout and redirect to homepage
  router.get('/logout', (req, res) => {
    req.logout()

    var returnTo = req.protocol + '://' + req.hostname;
    var port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += ':' + port;
    }
    var logoutURL = new url.URL(
      util.format('https://%s/v2/logout', envConfig.AUTH0_DOMAIN)
    )
    var searchString = querystring.stringify({
      client_id: envConfig.AUTH0_CLIENT_ID,
      returnTo: returnTo
    })
    logoutURL.search = searchString;

    res.redirect(logoutURL);
  })

  app.use('/', router)
}
