const { runAllCleanups } = require('../services/cleanupService');
const cron = require('node-cron');

// Run cleanup daily at 2 AM
const scheduleCleanupJobs = () => {
  // Run every day at 2:00 AM
  cron.schedule('0 2 * * *', async () => {
    console.log('🕐 Running scheduled cleanup job...');
    await runAllCleanups();
  });
  
  console.log('✅ Cleanup jobs scheduled (daily at 2 AM)');
};

// Run cleanup immediately (for testing)
const runCleanupNow = async () => {
  console.log('🕐 Running manual cleanup...');
  return await runAllCleanups();
};

module.exports = { scheduleCleanupJobs, runCleanupNow };