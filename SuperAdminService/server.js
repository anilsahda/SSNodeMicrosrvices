const express = require('express');
const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const internController = require('./controllers/InternController');
const contactRoutes = require('./routes/contactRoutes');
const contactController = require('./controllers/contactController');
const roleRoutes = require('./routes/roleRoutes');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const assignRoleRoutes = require('./routes/assignRoleRoutes');
const careerController = require('./controllers/careerController');
const careerRoutes = require('./routes/careerRoutes');
const jobRoutes = require('./routes/jobRoutes');
const jobController = require('./controllers/jobController');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require("./routes/blogRoutes");
const linkRoutes = require("./routes/linkRoutes");
const clinicInquiryRoutes = require("./routes/clinicInquiryRoutes");
const protect = require('./middleware/authMiddleware');

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:5500',
];

// ✅ CORS setup (also allow "null" for file:// testing)
app.use(
  cors({
    origin: function (origin, callback) {
      console.log('🔍 CORS request from:', origin);
      if (!origin || allowedOrigins.includes(origin) || origin === "null") {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());
app.use(express.json());

// ✅ Public routes
app.use('/api/auths', authRoutes);

app.post('/api/interns', internController.createIntern);
app.post('/api/contacts', contactController.createContact);
app.get('/api/jobs', jobController.getAllJobs);
app.get('/api/careers', careerController.getAllCareers);
app.use("/api/clinic-inquiries", clinicInquiryRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ Apply `protect` middleware to all routes after this line
app.use(protect);

app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/interns', internRoutes); // All other intern routes are protected
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/assignroles', assignRoleRoutes);
app.use("/api/links", linkRoutes);

// ✅ Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
