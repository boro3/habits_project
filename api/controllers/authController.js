const jwt = require('jsonwebtoken');
const { ApiResponse } = require('../utils/apiResponse');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
// Create a new habit
const login = async (req, res, next) => {
  try {
    // Simulate user authentication with hardcoded credentials
    const USER = {
      userName: 'testUser',
      password: '123'
    };

    let { userName, password } = req.body;

    if (!userName || !password || userName !== USER.userName || password !== USER.password) {
      // If the credentials are incorrect, return an error response
      return new ApiResponse(res).error('Wrong username or password', 401, 'Unauthorized');
    }

    let data = {
        time: Date(),
        userId: 12,
        exp: Math.floor(Date.now() / 1000) + (1440 * 60),
        iat: Math.floor(Date.now() / 1000),
        uName: req.body.username || 'defaultUser',
    }
    const token = jwt.sign(data, JWT_SECRET);
    res.send(token);
  } catch (error) {
    next(error);
  }
};

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const verified = jwt.verify(token, JWT_SECRET);
        if (verified) {
          return res.status(200).send(token);
        } else {
          return res.status(401).send(error);
        }
    } catch (error) {
      next(error);
    }
};

module.exports = {
    login,
    validateToken
};