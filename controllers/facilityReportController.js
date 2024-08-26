const FacilityReport = require('../models/FacilityReport');
const House = require('../models/House');

// Controller method to create a new facility report (Employee only)
const createFacilityReport = async (req, res) => {
  const { houseId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const newReport = await FacilityReport.create({
      title,
      description,
      createdBy: userId,
    });

    await House.findByIdAndUpdate(houseId, {
      $push: { facilityReports: newReport._id },
    });

    res
      .status(201)
      .json({ message: 'Facility report created successfully', newReport });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create facility report', error });
  }
};

// Controller method to get all facility reports for a specific house
const getFacilityReportsForHouse = async (req, res) => {
  const { houseId } = req.params;

  try {
    const house = await House.findById(houseId).populate({
      path: 'facilityReports',
      populate: { path: 'createdBy comments' },
    });

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    res.status(200).json(house.facilityReports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get facility reports', error });
  }
};

// Controller method to update the status of a facility report (HR only)
const updateFacilityReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedReport = await FacilityReport.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Facility report not found' });
    }

    res
      .status(200)
      .json({ message: 'Facility report status updated', updatedReport });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update facility report status', error });
  }
};

// Controller method to get details of a specific facility report
const getFacilityReportDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const report =
      await FacilityReport.findById(id).populate('createdBy comments');

    if (!report) {
      return res.status(404).json({ message: 'Facility report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get facility report details', error });
  }
};

module.exports = {
  createFacilityReport,
  getFacilityReportsForHouse,
  updateFacilityReportStatus,
  getFacilityReportDetails,
};
