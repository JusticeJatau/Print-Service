const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const { initializeBackblaze } = require('./src/config/backblaze');
const { scheduleCleanupJobs } = require('./src/jobs/cleanupJobs');
const { scheduleNotificationJobs } = require('./src/jobs/notificationJobs');

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Backblaze
initializeBackblaze().catch(console.error);

// Schedule background jobs
scheduleCleanupJobs();
scheduleNotificationJobs();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log(`📝 API Docs: http://localhost:${PORT}/api-docs`);
});

process.on('unhandledRejection', (err) => {
  console.log('❌ ERROR:', err.message);
  server.close(() => process.exit(1));
});