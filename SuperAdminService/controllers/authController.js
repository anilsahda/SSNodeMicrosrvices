const User = require('../models/User');
const AssignRole = require('../models/AssignRole');
const generateToken = require('../utils/generateToken'); // Make sure to create this file

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const role = await AssignRole.findOne({ userEmail: email });
    const roleName = role ? role.roleName : 'student';

    // Create token
    const token = generateToken(user._id, roleName);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      role: roleName,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
