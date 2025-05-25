const { habitService } = require('../services');
const { ApiResponse } = require('../utils/apiResponse');
const { ApiError } = require('../utils/apiError');

// Get all habits
const getAllHabits = async (req, res, next) => {
  try {
    const habits = await habitService.getAllHabits();
    return new ApiResponse(res).success(habits);
  } catch (error) {
    next(error);
  }
};

// Get single habit by ID
const getHabitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const habit = await habitService.getHabitById(id);
    
    if (!habit) {
      throw new ApiError(404, 'Habit not found');
    }
    
    return new ApiResponse(res).success(habit);
  } catch (error) {
    next(error);
  }
};

// Create a new habit
const createHabit = async (req, res, next) => {
  try {
    const habitData = req.body;
    const newHabit = await habitService.createHabit(habitData);
    return new ApiResponse(res).created(newHabit);
  } catch (error) {
    next(error);
  }
};

// Update an existing habit
const updateHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const habitData = req.body;
    
    const updatedHabit = await habitService.updateHabit(id, habitData);
    
    if (!updatedHabit) {
      throw new ApiError(404, 'Habit not found');
    }
    
    return new ApiResponse(res).success(updatedHabit);
  } catch (error) {
    next(error);
  }
};

// Delete a habit
const deleteHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await habitService.deleteHabit(id);
    
    if (!deleted) {
      throw new ApiError(404, 'Habit not found');
    }
    
    return new ApiResponse(res).success({ message: 'Habit deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Mark a habit as completed for today
const toggleHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHabit = await habitService.toggleHabit(id);
    
    if (!updatedHabit) {
      throw new ApiError(404, 'Habit not found');
    }
    
    return new ApiResponse(res).success(updatedHabit);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit
};