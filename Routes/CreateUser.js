const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../Models/userModel');

// Route to create a new user
router.post(
  '/CreateUser',
  [
    // Validation middleware using express-validator
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route for user login
router.post(
  '/LoginUser',
  [
    // Validation middleware using express-validator
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Validate the password
      if (user.password !== req.body.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
