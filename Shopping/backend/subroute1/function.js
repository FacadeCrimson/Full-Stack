const { Author } = require('../models');

const AuthorsController = {
  async index(req, res){
    const authors = await Author
       .find()
       .populate('books');
    res.send(authors);
  },
  async show(req, res){
    const author = await Author
       .findById(req.params.id)
       .populate('books');
    res.send(author);
  }
};
module.exports = AuthorsController