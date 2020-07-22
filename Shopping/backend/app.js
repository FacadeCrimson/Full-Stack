const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var userInViews = require('./functions/userInViews')

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
envConfig = require('./env')[env]

// config express-session
var sess = {
    secret: '-SGbST5dYexCEH',
    cookie: {},
    resave: false,
    saveUninitialized: true
  }

if (envConfig !== 'development') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;
    // Behind a proxy (like on Heroku) or "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
  }

// Load Passport
var passport = require('passport')
var Auth0Strategy = require('passport-auth0')

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
      domain: envConfig.AUTH0_DOMAIN,
      clientID: envConfig.AUTH0_CLIENT_ID,
      clientSecret: envConfig.AUTH0_CLIENT_SECRET,
      callbackURL: envConfig.AUTH0_CALLBACK_URL,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  )
passport.use(strategy)

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
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use(userInViews())

require('./routes')(app)

app.listen(envConfig.port)