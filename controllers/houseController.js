const House = require('../models/House');
const User = require('../models/User');

// Controller method to create a new house (HR only)
const createHouse = async (req, res) => {
  const { address, landlord, facilityInformation } = req.body;

  try {
    const newHouse = await House.create({
      address,
      landlord,
      facilityInformation,
    });

    res.status(201).json({ message: 'House created successfully', newHouse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create house', error });
  }
};

// Controller method to get details of a specific house
const getHouseDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findById(id).populate(
      'residents facilityReports',
    );

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get house details', error });
  }
};

// Controller method to delete a house (HR only)
const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findByIdAndDelete(id);

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    res.status(200).json({ message: 'House deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete house', error });
  }
};

// Controller method to get all houses (HR only)
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find().populate('residents facilityReports');
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get houses', error });
  }
};

module.exports = {
  createHouse,
  getHouseDetails,
  deleteHouse,
  getAllHouses,
};
