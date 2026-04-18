const pdf = require('pdf-parse');

const parsePDFPages = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.numpages;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
};

module.exports = parsePDFPages;