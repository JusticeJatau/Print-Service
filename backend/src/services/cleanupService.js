const File = require('../models/File');
const Order = require('../models/Order');
const { deleteFile } = require('./backblazeService');

// Clean up orphaned files (files not associated with any order)
const cleanupOrphanedFiles = async () => {
  try {
    // Find files older than 7 days with no order association
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const orphanedFiles = await File.find({
      folder: 'prints',
      orderId: null,
      createdAt: { $lt: sevenDaysAgo },
      isDeleted: false,
    });
    
    let deletedCount = 0;
    
    for (const file of orphanedFiles) {
      try {
        await deleteFile(file.fileId, file.fileName);
        file.isDeleted = true;
        await file.save();
        deletedCount++;
      } catch (error) {
        console.error(`Failed to delete file ${file._id}:`, error.message);
      }
    }
    
    console.log(`🧹 Cleaned up ${deletedCount} orphaned files`);
    return { deletedCount };
  } catch (error) {
    console.error('Cleanup orphaned files error:', error);
    return { deletedCount: 0, error: error.message };
  }
};

// Clean up old completed orders (soft delete after 90 days)
const cleanupOldOrders = async () => {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    // Mark old completed orders for cleanup (soft delete)
    const oldOrders = await Order.updateMany(
      {
        status: 'completed',
        createdAt: { $lt: ninetyDaysAgo },
      },
      {
        isArchived: true,
      }
    );
    
    console.log(`🧹 Archived ${oldOrders.modifiedCount} old orders`);
    return { archivedCount: oldOrders.modifiedCount };
  } catch (error) {
    console.error('Cleanup old orders error:', error);
    return { archivedCount: 0, error: error.message };
  }
};

// Clean up failed transactions
const cleanupFailedTransactions = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const result = await Transaction.deleteMany({
      status: 'failed',
      createdAt: { $lt: thirtyDaysAgo },
    });
    
    console.log(`🧹 Deleted ${result.deletedCount} failed transactions`);
    return { deletedCount: result.deletedCount };
  } catch (error) {
    console.error('Cleanup transactions error:', error);
    return { deletedCount: 0, error: error.message };
  }
};

// Run all cleanup tasks
const runAllCleanups = async () => {
  console.log('🧹 Starting cleanup jobs...');
  
  const orphanedResult = await cleanupOrphanedFiles();
  const ordersResult = await cleanupOldOrders();
  const transactionsResult = await cleanupFailedTransactions();
  
  console.log('🧹 Cleanup jobs completed');
  
  return {
    orphanedFiles: orphanedResult,
    oldOrders: ordersResult,
    failedTransactions: transactionsResult,
  };
};

module.exports = {
  cleanupOrphanedFiles,
  cleanupOldOrders,
  cleanupFailedTransactions,
  runAllCleanups,
};