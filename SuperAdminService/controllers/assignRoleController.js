const AssignRole = require('../models/AssignRole');
const User = require('../models/User');
const Role = require('../models/Role');

// Create assignment
exports.assignRole = async (req, res) => {
  try {
    const { userEmail, roleName } = req.body;

    // Validate user email exists
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Validate role name exists
    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ error: 'Role not found' });

    // Check if already assigned
    const exists = await AssignRole.findOne({ userEmail });
    if (exists) return res.status(400).json({ error: 'Role already assigned to user' });

    const assignment = new AssignRole({ userEmail, roleName });
    await assignment.save();

    res.status(201).json({ message: 'Role assigned successfully', assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await AssignRole.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const deleted = await AssignRole.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Assignment not found' });

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { userEmail, roleName } = req.body;
    const assignmentId = req.params.id;

    // Check if assignment exists
    const existing = await AssignRole.findById(assignmentId);
    if (!existing) return res.status(404).json({ error: 'Assignment not found' });

    // Optionally validate new user/role exists (if you want)
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ error: 'Role not found' });

    // Update assignment
    existing.userEmail = userEmail;
    existing.roleName = roleName;
    const updated = await existing.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllHRs = async (req, res) => {
  try {
    // Step 1: Get all assignments where role is 'hr'
    const hrAssignments = await AssignRole.find({ roleName: 'HR' });

    // Step 2: Extract emails
    const hrEmails = hrAssignments.map((assignment) => assignment.userEmail);

    // Step 3: Fetch all users matching those emails
    const hrUsers = await User.find({ email: { $in: hrEmails } });

    res.status(200).json(hrUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};