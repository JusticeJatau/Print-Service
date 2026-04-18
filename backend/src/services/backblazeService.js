const { getBackblaze } = require('../config/backblaze');

const uploadFile = async (fileBuffer, originalName, folder = 'prints') => {
  try {
    const { b2, bucketId } = getBackblaze();
    
    const timestamp = Date.now();
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${folder}/${timestamp}_${cleanName}`;
    
    const response = await b2.uploadFile({
      bucketId,
      fileName,
      data: fileBuffer,
      contentType: fileBuffer.mimetype || 'application/octet-stream',
    });
    
    const fileUrl = `${process.env.B2_BASE_URL}/${process.env.B2_BUCKET_NAME}/${fileName}`;
    
    return {
      success: true,
      fileId: response.data.fileId,
      fileName: fileName,
      fileUrl: fileUrl,
    };
  } catch (error) {
    console.error('Backblaze upload error:', error);
    throw new Error('Failed to upload file to storage');
  }
};

const deleteFile = async (fileId, fileName) => {
  try {
    const { b2 } = getBackblaze();
    
    await b2.deleteFileVersion({
      fileId,
      fileName,
    });
    
    return { success: true };
  } catch (error) {
    console.error('Backblaze delete error:', error);
    throw new Error('Failed to delete file from storage');
  }
};

module.exports = { uploadFile, deleteFile };