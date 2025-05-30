const express = require('express');
const habitRoutes = require('./habitRoutes');
const authRoutes = require('./authRoutes');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Apply route modules
router.use('/habits', authMiddleware, habitRoutes);
router.use('/auth', authRoutes);

module.exports = router;