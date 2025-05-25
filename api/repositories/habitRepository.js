const { v4: uuidv4 } = require('uuid');

// This repository handles CRUD operations for habits
class HabitRepository {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.collection = 'habits';
  }

  // Find all habits
  async findAll() {
    return this.dataStore.getAll(this.collection);
  }

  // Find a habit by ID
  async findById(id) {
    return this.dataStore.getById(this.collection, id);
  }

  // Create a new habit
  async create(habitData) {
    const id = habitData.id || uuidv4();
    const newHabit = { ...habitData, id };
    
    await this.dataStore.create(this.collection, newHabit);
    return newHabit;
  }

  // Update an existing habit
  async update(id, habitData) {
    return this.dataStore.update(this.collection, id, habitData);
  }

  // Delete a habit by ID
  async delete(id) {
    return this.dataStore.delete(this.collection, id);
  }
}

module.exports = HabitRepository;