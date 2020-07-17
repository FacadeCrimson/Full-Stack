require('./app');
const mongoose = require('mongoose');
const { Product, Customer} = require('./models');

//drop on every test
Customer.collection.drop()
Product.collection.drop()

// async function seedCustomers(){
//   const customers =[
//     { name: 'Chris', login_name: 'sevilayha', password: 'password' },
//     { name: 'Simon', login_name: 'facade', password:'123456'}
//   ]

//   for(customer of customers){
//     var newCustomer = new Customer(customer);
//     await newCustomer.save();
//   }
// }

async function seedProducts() {
  const products = [
    { category:"Vegetable", tag:["Other"],name:"Cucumber",price:1.00,ratings:[],info:{size:"2.88 x 6.00 x 10.00 Inches",weight:"1 lb",description:"The cucumber is a creeping vine that roots in the ground and grows up trellises or other supporting frames, wrapping around supports with thin, spiraling tendrils. The plant may also root in a soilless medium, whereby it will sprawl along the ground in lieu of a supporting structure. The vine has large leaves that form a canopy over the fruits.",other:""},comments:[]},
    { category:"Vegetable", tag:["Red & Orange"],name:"Tomato",price:2.00,ratings:[],info:{size:"3.00 x 3.00 x 3.00 Inches",weight:"20 oz",description:"Botanically, a tomato is a fruit—a berry, consisting of the ovary, together with its seeds, of a flowering plant. However, the tomato is considered a culinary vegetable because it has a much lower sugar content than culinary fruits; it is typically served as part of a salad or main course of a meal, rather than as a dessert.",other:""},comments:[]},
    { category:"Vegetable", tag:["Dark Green "],name:"Kale",price:1.50,ratings:[],info:{size:"1.88 x 8.00 x 6.75 Inches",weight:"12 oz",description:"Kale, or leaf cabbage, belongs to a group of cabbage (Brassica oleracea) cultivars grown for their edible leaves, although some are used as ornamentals. Kale plants have green or purple leaves, and the central leaves do not form a head (as with headed cabbage). Kales are considered to be closer to wild cabbage than most of the many domesticated forms of Brassica oleracea.",other:""},comments:[]},
    { category:"Vegetable", tag:["Starchy"],name:"Corn",price:1.63,ratings:[],info:{size:"11.25 x 2.19 x 7.25 Inches",weight:"0.5 lb",description:"Corn has become a staple food in many parts of the world, with the total production of maize surpassing that of wheat or rice. However, little of this maize is consumed directly by humans: most is used for corn ethanol, animal feed and other corn products, such as corn starch and corn syrup.",other:""},comments:[]},
    { category:"Vegetable", tag:["Beans and Peas"],name:"black beans",price:2.19,ratings:[],info:{size:"4.00 x 4.00 x 4.65 Inches",weight:"2.14 lb",description:"The black turtle bean is a small, shiny variety of the common bean (Phaseolus vulgaris) especially popular in Latin American cuisine, though it can also be found in the Cajun and Creole cuisines of south Louisiana. Like all varieties of the common bean, it is native to the Americas.",other:""},comments:[]},
  ]
  for (product of products) {
    var newProduct = new Product(product);
    await newProduct.save();
  }
}

// async function seedBooks() {
// const jkRowling = await Product.findOne({ name: 'JK Rowling' });
//   const tonyRobbins = await Product.findOne({ name: 'Tony Robbins' });
// let harryPotter = new Book({ title: 'Harry Potter', product: jkRowling._id });
//   let awakenGiant = new Book({ title: 'Awaken the Giant Within', product: tonyRobbins._id });
// await harryPotter.save();
//   await awakenGiant.save();
// jkRowling.books.push(harryPotter);
//   tonyRobbins.books.push(awakenGiant);
// await jkRowling.save();
//   await tonyRobbins.save();
// }

// seedCustomers()
seedProducts()
// seedBooks()