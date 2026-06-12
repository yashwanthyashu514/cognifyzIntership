import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Temporary server-side storage
const tempStorage = [];

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('form', { 
    submissions: tempStorage, 
    errors: [], 
    success: false,
    prevData: {}
  });
});

app.post(
  '/submit',
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('phone')
      .trim()
      .matches(/^\d{10}$/)
      .withMessage('Phone number must be exactly 10 digits'),
    body('age')
      .isInt({ min: 18, max: 100 })
      .withMessage('Age must be a number between 18 and 100')
  ],
  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.render('form', {
        submissions: tempStorage,
        errors: errors.array(),
        success: false,
        prevData: req.body
      });
    }

    const { username, email, phone, age } = req.body;
    
    // Store validated data in temporary storage
    const newRecord = {
      id: Date.now(),
      username,
      email,
      phone,
      age: parseInt(age),
      timestamp: new Date().toLocaleTimeString()
    };
    
    tempStorage.unshift(newRecord);

    res.render('form', {
      submissions: tempStorage,
      errors: [],
      success: true,
      prevData: {}
    });
  }
);

// Clear storage endpoint for convenience
app.post('/clear', (req, res) => {
  tempStorage.length = 0;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🚀 Task 2 Server running at http://localhost:${PORT}`);
});
