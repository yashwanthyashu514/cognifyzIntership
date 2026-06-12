import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse urlencoded body (from forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/submit', (req, res) => {
  const { name, email, role, feedback } = req.body;
  
  // Basic validation check
  if (!name || !email || !feedback) {
    return res.render('index', { 
      error: 'Please fill in all required fields (Name, Email, Feedback)' 
    });
  }

  // Render the result page with the submitted form data
  res.render('result', { name, email, role, feedback });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Task 1 Server running at http://localhost:${PORT}`);
});
