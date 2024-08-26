const db = require('./connection');
const House = require('../models/House');

const seedHouses = async () => {
  try {
    // Delete existing houses in the database
    await House.deleteMany({});

    // Define house data to seed
    const housesData = [
      {
        address: '123 Maple Street',
        landlord: {
          fullName: 'John Doe',
          phoneNumber: '123-456-7890',
          email: 'johndoe@example.com',
        },
        facilityInformation: {
          beds: 4,
          mattresses: 4,
          tables: 1,
          chairs: 4,
        },
      },
      {
        address: '456 Oak Avenue',
        landlord: {
          fullName: 'Jane Smith',
          phoneNumber: '987-654-3210',
          email: 'janesmith@example.com',
        },
        facilityInformation: {
          beds: 3,
          mattresses: 3,
          tables: 1,
          chairs: 3,
        },
      },
      {
        address: '789 Pine Road',
        landlord: {
          fullName: 'Bob Johnson',
          phoneNumber: '555-123-4567',
          email: 'bobjohnson@example.com',
        },
        facilityInformation: {
          beds: 5,
          mattresses: 5,
          tables: 2,
          chairs: 6,
        },
      },
    ];

    // Insert the house data into the database
    await House.insertMany(housesData);

    console.log('Houses seeded successfully');
  } catch (error) {
    console.error('Error seeding houses', error);
  } finally {
    await db.close();
  }
};

seedHouses();
