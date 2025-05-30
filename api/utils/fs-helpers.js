const fs = require('fs').promises;
const path = require('path');

/**
 * Ensures a directory exists, creating it if it doesn't
 * @param {string} dirPath - Path to the directory
 * @returns {Promise<boolean>} - Returns true if successful
 */
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    if (error.code === 'EXIST') {
      return true;
    }
    throw error;
  }
}

/**
 * Checks if a file exists
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} - Returns true if file exists
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  ensureDir,
  fileExists
};