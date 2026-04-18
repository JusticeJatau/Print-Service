const B2 = require('backblaze-b2');

let b2 = null;
let bucketId = null;

const initializeBackblaze = async () => {
  try {
    b2 = new B2({
      applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
      applicationKey: process.env.B2_APPLICATION_KEY,
    });

    await b2.authorize();
    console.log('✅ Backblaze B2 connected');

    const response = await b2.listBuckets();
    const bucket = response.data.buckets.find(
      (b) => b.bucketName === process.env.B2_BUCKET_NAME
    );

    if (bucket) {
      bucketId = bucket.bucketId;
    } else {
      const newBucket = await b2.createBucket({
        bucketName: process.env.B2_BUCKET_NAME,
        bucketType: 'allPublic',
      });
      bucketId = newBucket.data.bucketId;
    }

    console.log(`✅ Backblaze bucket ready: ${process.env.B2_BUCKET_NAME}`);
    return { b2, bucketId };
  } catch (error) {
    console.error('❌ Backblaze error:', error.message);
    throw error;
  }
};

const getBackblaze = () => {
  if (!b2 || !bucketId) {
    throw new Error('Backblaze not initialized');
  }
  return { b2, bucketId };
};

module.exports = { initializeBackblaze, getBackblaze };