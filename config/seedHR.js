const db = require('./connection');
const argon2 = require('argon2');
const User = require('../models/User');
const visaDocumentS = require('../models/VisaDocuments');

const seedHR = async () => {
  try {
    await Employee.deleteMany({ role: 'HR' }); // Delete existing HR accounts
    // await Employee.deleteMany(); 
    await User.deleteMany({ role: 'HR' }); // Delete existing HR accounts

    const hashedPassword = await argon2.hash('1234HR!');

    await User.create({
      username: 'hradmin',
      email: 'hr@company.com',
      password: hashedPassword,
      role: 'HR',
    });
    // await Employee.create({
    //   username: 'employeeTest123',
    //   email: 'employee@company.com',
    //   password: hashedPassword,
    // });
    console.log('HR account seeded successfully');
  } catch (error) {
    console.error('Error seeding HR account', error);
  } finally {
    await db.close();
  }
};

seedHR();

// for visa documents seed
const seedVisa = async () => {
  try {
    await visaDocumentS.create({
      userid: 'xxxxxx',
      optReceipt: { name: 'receipt' },
      optEAD: { name: 'ead' },
      i983: { name: 'i983' },
      i20: { name: 'i20' },
    });
  } catch (e) {
    console.error('Error seeding visa documents dataset', e);
  } finally {
    await db.close();
  }
};
seedVisa();
