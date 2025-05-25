const HabitRepository = require('./habitRepository');
const InMemoryStore = require('./inMemoryStore');

// Initialize the data store
const habitStore = new InMemoryStore();

// Initialize repositories with their dependencies
const habitRepository = new HabitRepository(habitStore);

module.exports = {
  habitRepository
};