const Employee = require('../models/Employee');

// HR Get all employees
const getAllEmployeesHR = async(req, res) => {
    try {
      // Sort by last name
      const employees = await Employee.find().sort({ lastName: 1 })
                .select('firstName lastName middleName preferredName ssn citizenship.visaStatus cellPhoneNumber userId')
                .populate({path: 'userId', select: 'email'});
  
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ message: 'Server error!', error });
    }
  };

const getEmployeeByIdHR = async(req, res) => {
    const userId = req.params.id
    try {
        const employee = await Employee.findOne({ userId }).populate({path: 'userId', select: 'email'});
        if (!employee) {
            return res.status(404).json({ error: 'No UserId matched' })
        }
        res.status(200).json(employee)
    } catch (e) {
        console.error('Error when searching employee by Id', e)
        return res.status(500).json({message: 'Error when searching employee by Id'})
    }
}

module.exports = {
    getAllEmployeesHR,
    getEmployeeByIdHR,
}