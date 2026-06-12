import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', signup);

// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth, getMe);

export default router;
