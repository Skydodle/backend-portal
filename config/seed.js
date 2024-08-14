const db = require('./connection');
const Product = require('../models/Product');
const products = require('./products');

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    await db.close();
  }
};

seedDatabase();
