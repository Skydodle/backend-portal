const db = require('./connection');
const argon2 = require('argon2');
const User = require('../models/User');
const Employee = require('../models/Employee');
const VisaDocuments = require('../models/VisaDocuments');

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

    // Employee 2: Alice Smith (F1 Visa)
    const hashedPassword2 = await argon2.hash('abcd1234!');
    const newUser2 = await User.create({
      username: 'aliceF1',
      email: 'alice@company.com',
      password: hashedPassword2,
      role: 'Employee',
    });

    const newEmployee2 = await Employee.create({
      userId: newUser2._id,
      onboardingStatus: 'Not Started',
      firstName: 'Alice',
      lastName: 'Smith',
      middleName: 'L.',
      preferredName: 'Ally',
      address: {
        street: '456 Elm St',
        city: 'Othertown',
        state: 'NY',
        zip: '67890',
      },
      cellPhoneNumber: '555-234-5678',
      workPhoneNumber: '555-876-5432',
      car: {
        make: 'Honda',
        model: 'Civic',
        color: 'Red',
      },
      ssn: '987-65-4321',
      dateOfBirth: new Date('1992-05-15'),
      gender: 'Female',
      citizenship: {
        visaStatus: 'F1',
        startDate: new Date('2022-12-31'),
        endDate: new Date('2026-12-31'),
      },
      driverLicense: {
        hasDriverLicense: true,
        licenseNumber: 'S9876543',
        expirationDate: new Date('2028-12-31'),
      },
      reference:{
        firstName: 'Bob',
        lastName: 'Dylan',
        middleName: '',
        phone: '555-234-1111',
        email: 'bob.dylan@example.com',
        relationship: 'Uncle',
      },
      emergencyContacts: [
        {
          firstName: 'Robert',
          lastName: 'Smith',
          middleName: '',
          phoneNumber: '555-234-1111',
          emailAddress: 'robert.smith@example.com',
          relationship: 'Father',
        },
        {
          firstName: 'Tom',
          lastName: 'Yi',
          middleName: '',
          phoneNumber: '123-456-7890',
          emailAddress: 'tom.yi@example.com',
          relationship: 'Grand Dad',
        },
      ],
      feedback: '',
    });

    // Create Visa Documents for Alice Smith
    const newVisaDocuments2 = await VisaDocuments.create({
      userid: newUser2._id,
      optReceipt: {
        name: '',
        status: 'pending',
        feedback: '',
      },
      optEAD: {
        name: '',
        status: 'pending',
        feedback: '',
      },
      i983: {
        name: '',
        status: 'pending',
        feedback: '',
      },
      i20: {
        name: '',
        status: 'pending',
        feedback: '',
      }
    });

    // Link Visa Documents to Alice's Employee record
    newEmployee2.citizenship.optDocument = newVisaDocuments2._id;
    await newEmployee2.save();
    console.log('Employee seeded successfully');
  } catch (error) {
    console.error('Error seeding Employee', error);
  } finally {
    await db.close();
  }
};

seedEmployee();
