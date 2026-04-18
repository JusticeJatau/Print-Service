const mammoth = require('mammoth');

const parseWordPages = async (buffer) => {
  try {
    // Estimate pages based on character count (rough estimate)
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value;
    const estimatedPages = Math.max(1, Math.ceil(text.length / 2500)); // ~2500 chars per page
    return estimatedPages;
  } catch (error) {
    console.error('Word parsing error:', error);
    throw new Error('Failed to parse Word document');
  }
};

module.exports = parseWordPages;