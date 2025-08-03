import Employee from '../models/employee.model.js';

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { email, role, mobile } = req.body;

    const ifExists = await Employee.findOne({ email });
    if (ifExists) {
      return res.status(400).json({ error: 'Employee already exists' });
    }

    const employee = new Employee({ email, role, mobile });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Employee updated successfully', employee: updated });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
