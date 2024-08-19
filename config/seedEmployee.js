const db = require('./connection');
const argon2 = require('argon2');
const User = require('../models/User');
const Employee = require('../models/Employee');

const seedEmployee = async () => {
  try {
    // Clear existing Employee data
    await Employee.deleteMany({}); 
    await User.deleteMany({ role: 'Employee' });

    // Create a User record for an Employee
    const hashedPassword = await argon2.hash('1234HR!');
    const newUser = await User.create({
      username: 'employeeTest123',
      email: 'employee@company.com',
      password: hashedPassword,
      role: 'Employee',
    });

    // Create an Employee record linked to the created User
    await Employee.create({
      userId: newUser._id,
      onboardingStatus: 'Not Started',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'M.',
      preferredName: 'Johnny',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      cellPhoneNumber: '555-123-4567',
      workPhoneNumber: '555-987-6543',
      car: {
        make: 'Toyota',
        model: 'Camry',
        color: 'Blue',
      },
      ssn: '123-45-6789',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male',
      citizenship: {
        visaStatus: 'Citizen',
      },
      driverLicense: {
        hasDriverLicense: true,
        licenseNumber: 'D1234567',
        expirationDate: new Date('2030-01-01'),
      },
      emergencyContacts: [
        {
          firstName: 'Jane',
          lastName: 'Doe',
          middleName: '',
          phone: '555-123-9999',
          email: 'jane.doe@example.com',
          relationship: 'Spouse',
        },
      ],
      feedback: '',
    });

    console.log('Employee seeded successfully');
  } catch (error) {
    console.error('Error seeding Employee', error);
  } finally {
    await db.close();
  }
};

seedEmployee();
