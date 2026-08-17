import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from '../config/config.js';

// Route Definitions Import (We will create these files next)
import contactRoutes from './routes/contact.routes.js';
import projectRoutes from './routes/project.routes.js';
import educationRoutes from './routes/education.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize Database Connection using Mongoose
mongoose.connect(config.mongoUri)
    .then(() => console.log(`Successfully connected to the database: Portfolio`))
    .catch((err) => console.error(`Database connection error: ${err}`));

// Core Baseline Spec Required Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ "message": "Welcome to My Portfolio application." });
});

// Bind Endpoint Routes to the Application
app.use('/', contactRoutes);
app.use('/', projectRoutes);
app.use('/', educationRoutes);
app.use('/', userRoutes);

// Execute Server
app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
    }
    console.info(`Server is running smoothly on port ${config.port}`);
});