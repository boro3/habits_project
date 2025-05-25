const express = require('express');
const habitRoutes = require('./habitRoutes');

const router = express.Router();

// Apply route modules
router.use('/habits', habitRoutes);

module.exports = router;