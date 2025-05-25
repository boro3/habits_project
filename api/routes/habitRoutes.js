const express = require('express');
const habitController = require('../controllers/habitController');

const router = express.Router();

// GET /api/habits - Get all habits
router.get('/', habitController.getAllHabits);

// GET /api/habits/:id - Get a specific habit
router.get('/:id', habitController.getHabitById);

// POST /api/habits - Create a new habit
router.post('/', habitController.createHabit);

// PUT /api/habits/:id - Update a habit
router.put('/:id', habitController.updateHabit);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', habitController.deleteHabit);

// PATCH /api/habits/:id/complete - Mark a habit as completed for today
router.patch('/:id/toggle', habitController.toggleHabit);

module.exports = router;