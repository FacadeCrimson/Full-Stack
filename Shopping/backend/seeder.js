require('./app');
const mongoose = require('mongoose');
const { Product, Customer} = require('./models');

//drop on every test
Customer.collection.drop()
Product.collection.drop()

async function seedCustomers(){
  const customers =[
    { name: 'Chris', login_name: 'sevilayha', password: 'password' },
    { name: 'Simon', login_name: 'facade', password:'123456'}
  ]

  for(customer of customers){
    var newCustomer = new Customer(customer);
    await newCustomer.save();
  }
}

async function seedProducts() {
  const products = [
    { name: 'JK Rowling', bio: 'J.K. Rowling is the Product of the much-loved series of seven Harry Potter novels, originally published between 1997 and 2007.' },
    { name: 'Tony Robbins', bio: 'Tony Robbins is an entrepreneur, best-selling Product, philanthropist and the nation\'s #1 Life and Business Strategist.' },
  ];
for (product of products) {
    var newProduct = new Product(product);
    await newProduct.save();
  }
const a = await Product.find();
  console.log('products: ', a);
}

async function seedBooks() {
const jkRowling = await Product.findOne({ name: 'JK Rowling' });
  const tonyRobbins = await Product.findOne({ name: 'Tony Robbins' });
let harryPotter = new Book({ title: 'Harry Potter', product: jkRowling._id });
  let awakenGiant = new Book({ title: 'Awaken the Giant Within', product: tonyRobbins._id });
await harryPotter.save();
  await awakenGiant.save();
jkRowling.books.push(harryPotter);
  tonyRobbins.books.push(awakenGiant);
await jkRowling.save();
  await tonyRobbins.save();
}
seedCustomers()
seedProducts()
seedBooks()