const HabitService = require('./habitService');
const { habitRepository } = require('../repositories');

// Initialize services with dependencies
const habitService = new HabitService(habitRepository);

module.exports = {
  habitService
};