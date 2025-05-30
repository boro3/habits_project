const HabitRepository = require('./habitRepository');
const InMemoryStore = require('./inMemoryStore');
const FileStore = require('./fileStore');
const dotenv = require('dotenv');

dotenv.config();
// Initialize the data store
if (process.env.USE_FILE_STORAGE === 'TRUE') {
  console.log('Using File Storage');
} else {
  console.log('Using In-Memory Storage');
}
const habitStore = process.env.USE_FILE_STORAGE === 'TRUE' ? new FileStore() : new InMemoryStore();

// Initialize repositories with their dependencies
const habitRepository = new HabitRepository(habitStore);

module.exports = {
  habitRepository
};