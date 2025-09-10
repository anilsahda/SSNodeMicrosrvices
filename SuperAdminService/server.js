const express = require('express');
const connectDB = require('./config/db');

const roleRoutes = require('./routes/roleRoutes');

const userRoutes = require('./routes/userRoutes');
const assignRoleRoutes = require('./routes/assignRoleRoutes');


const authRoutes = require('./routes/authRoutes');


const protect = require('./middleware/authMiddleware');

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  
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



// ✅ Apply `protect` middleware to all routes after this line
app.use(protect);


app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);



app.use('/api/assignroles', assignRoleRoutes);


// ✅ Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
