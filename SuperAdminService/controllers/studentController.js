const Student = require('../models/Student');
const User = require('../models/User');
const Intern = require('../models/Intern');
const AssignRole = require('../models/AssignRole');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      addedBy: req.body.map  // ⬅️ map field contains the selected HR's ID
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { map, ...rest } = req.body;

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        addedBy: map  // Set new HR's ID if changed
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student counts grouped by user
exports.getStudentCountsByUser = async (req, res) => {
  try {
    const counts = await Student.aggregate([
      {
        $match: { addedBy: { $ne: null } }
      },
      {
        $group: {
          _id: "$addedBy",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          name: "$userInfo.name",
          email: "$userInfo.email",
          candidateCount: "$count"
        }
      }
    ]);

    res.json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCandidates = await Student.countDocuments();
    const scheduledInterviews = await Student.countDocuments({ interviewStatus: "Scheduled" });
    const placementsDone = await Student.countDocuments({ placementStatus: "Placed" });
    const pendingPayments = await Student.countDocuments({ paymentStatus: { $ne: "Fully Paid" } });
    const totalInquires = await Intern.countDocuments();
    const totalUsers = await User.countDocuments();

    // Get HRs from AssignRole
    const hrRoles = await AssignRole.find({ roleName: "HR" }).lean();
    const hrEmails = hrRoles.map(r => r.userEmail);

    // Get HR user data
    const hrUsers = await User.find({ email: { $in: hrEmails } }).select("name email");

    // Aggregate student data per HR
    const candidateCounts = await Student.aggregate([
      {
        $match: { addedBy: { $ne: null } }
      },
      {
        $group: {
          _id: "$addedBy",
          candidateCount: { $sum: 1 },
          fullyPaid: {
            $sum: { $cond: [{ $eq: ["$paymentStatus", "Fully Paid"] }, 1, 0] }
          },
          partiallyPaid: {
            $sum: { $cond: [{ $eq: ["$paymentStatus", "Partially Paid"] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          name: "$userInfo.name",
          email: "$userInfo.email",
          candidateCount: 1,
          fullyPaid: 1,
          partiallyPaid: 1
        }
      }
    ]);

    // Merge HRs with their counts and payment percentage
    const hrWithCounts = hrUsers.map(hr => {
      const found = candidateCounts.find(c => c.email === hr.email);
      const candidateCount = found ? found.candidateCount : 0;
      const fullyPaid = found ? found.fullyPaid : 0;
      const partiallyPaid = found ? found.partiallyPaid : 0;
      const totalPaid = fullyPaid + partiallyPaid;

      const paymentPercentage = candidateCount > 0
        ? ((totalPaid / candidateCount) * 100).toFixed(1)
        : "0.0";

      return {
        name: hr.name,
        email: hr.email,
        candidateCount,
        fullyPaid,
        partiallyPaid,
        paymentPercentage: parseFloat(paymentPercentage)
      };
    });

    res.json({
      totalCandidates,
      scheduledInterviews,
      placementsDone,
      pendingPayments,
      totalInquires,
      totalUsers,
      totalhr: hrUsers.length,
      hrNames: hrUsers.map(hr => hr.name),
      hrDetails: hrWithCounts
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: error.message });
  }
};
