const db = require('./connection');
const argon2 = require('argon2');
const User = require('../models/User');

const seedHR = async () => {
  try {
    await User.deleteMany({ role: 'HR' }); // Delete existing HR accounts

    const hashedPassword = await argon2.hash('1234HR!');

    await User.create({
      username: 'hradmin',
      email: 'hr@company.com',
      password: hashedPassword,
      role: 'HR',
    });
    
    console.log('HR account seeded successfully');
  } catch (error) {
    console.error('Error seeding HR account', error);
  } finally {
    await db.close();
  }
};

seedHR();

