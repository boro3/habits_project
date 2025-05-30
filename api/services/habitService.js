const {calculateStreak} = require('../utils/streakCalculator');

class HabitService {
    constructor(habitRepository) {
      this.habitRepository = habitRepository;
    }
  
    // Get all habits
    async getAllHabits() {
      return this.habitRepository.findAll();
    }
  
    // Get a single habit by ID
    async getHabitById(id) {
      return this.habitRepository.findById(id);
    }
  
    // Create a new habit
    async createHabit(habitData) {
      const newHabit = {
        ...habitData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        streak: 0,
        completedDates: []
      };
      
      return this.habitRepository.create(newHabit);
    }
  
   // Update an existing habit
    async updateHabit(id, habitData) {
      const existingHabit = await this.habitRepository.findById(id);
      
      if (!existingHabit) {
        return null;
      }
      
      const updatedHabit = {
        ...existingHabit,
        ...habitData,
        updatedAt: new Date().toISOString()
      };
      
      return this.habitRepository.update(id, updatedHabit);
    }
  
    // Delete a habit
    async deleteHabit(id) {
      return this.habitRepository.delete(id);
    }
  
    // Mark a habit as completed or not complete for today
    async toggleHabit(id) {
      const habit = await this.habitRepository.findById(id);
      let updatedHabit = {};
      
      if (!habit) {
        return null;
      }
      
      const today = new Date().toISOString().split('T')[0];
      // Check if already completed today
      if (habit.completedDates.includes(today)) {
        updatedHabit = {
          ...habit,
          completedDates: [...habit.completedDates.filter(h => h !== today)],
          updatedAt: new Date().toISOString()
        };
      } else {
        updatedHabit = {
          ...habit,
          completedDates: [...habit.completedDates, today],
          updatedAt: new Date().toISOString()
        };
      } 

      // Calculate the current streak
      let currentStreak  = calculateStreak(updatedHabit.completedDates, updatedHabit.streak);
      if (currentStreak > updatedHabit.streak) {
        updatedHabit.streak = currentStreak;
      }
      
      return this.habitRepository.update(id, updatedHabit);
    }

  }
  
module.exports = HabitService;