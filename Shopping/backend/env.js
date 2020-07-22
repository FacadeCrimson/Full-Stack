var path = require('path'),
rootPath = path.normalize(__dirname + '/')
  
module.exports = {
  development: {
    rootPath: rootPath,
    frontend: "http://127.0.0.1:3000",
    db: 'mongodb://localhost:27017/test',
    port: process.env.PORT || 5000,
    AUTH0_CLIENT_ID: "i54sB7aK2e7baUdmFJoM3PsOTkYWz676",
    AUTH0_DOMAIN: "simontan.auth0.com",
    AUTH0_CLIENT_SECRET: "PCKWrAM3rLVl-NgYS_p-o_H53Si2pqEE9wFSWHqxGfNmwXCuniQkU-w4whcv33FK",
    AUTH0_CALLBACK_URL:"http://localhost:3000"
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGOLAB_URI,
    port: process.env.PORT || 80,
    AUTH0_CLIENT_ID:"i54sB7aK2e7baUdmFJoM3PsOTkYWz676",
    AUTH0_DOMAIN:"simontan.auth0.com",
    AUTH0_CLIENT_SECRET:"PCKWrAM3rLVl-NgYS_p-o_H53Si2pqEE9wFSWHqxGfNmwXCuniQkU-w4whcv33FK",
    AUTH0_CALLBACK_URL:"http://localhost:3000"
  }
}