import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All task routes require authentication
router.use(auth);

// @route   POST /api/tasks
// @access  Private
router.post('/', createTask);

// @route   GET /api/tasks
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/stats/summary
// @access  Private
router.get('/stats/summary', getTaskStats);

// @route   GET /api/tasks/:id
// @access  Private
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @access  Private
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/:id', deleteTask);

export default router;
