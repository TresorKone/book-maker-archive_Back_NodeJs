const express = require('express');

const userController = require('../controllers/auth');

const router = express.Router();

// POST /signup
router.post('/signup', userController.postSignup);

module.exports = router;