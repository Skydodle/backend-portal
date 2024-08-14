const db = require('./connection');
const Admin = require('../models/Admin');
const argon2 = require('argon2');

const seedAdmin = async () => {
  try {
    await Admin.deleteMany();

    const hashedPassword = await argon2.hash('1234Admin!');

    await Admin.create({
      username: 'admin',
      email: 'admin@123.com',
      password: hashedPassword,
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    await db.close();
  }
};

seedAdmin();
