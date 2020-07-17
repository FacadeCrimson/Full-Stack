var path = require('path'),
rootPath = path.normalize(__dirname + '/')
  
module.exports = {
  development: {
    rootPath: rootPath,
    frontend: "http://127.0.0.1:3000",
    db: 'mongodb://localhost:27017/test',
    port: process.env.PORT || 5000
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGOLAB_URI,
    port: process.env.PORT || 80
  }
};