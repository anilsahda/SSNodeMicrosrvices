const Role = require('../models/Role');

// Create Role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Role
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Role
exports.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
