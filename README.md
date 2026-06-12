# 🚀 Cognifyz Full Stack Development Internship - Complete Project

A professional **Task Management & Project Dashboard** application built with React, Node.js, Express, and MongoDB. This project demonstrates all requirements for the Cognifyz Full Stack Development internship program.

## 📌 Project Overview

This application showcases a real-world full-stack development project with:
- ✅ User authentication with JWT
- ✅ Task CRUD operations
- ✅ Real-time form validation
- ✅ Professional responsive UI
- ✅ MongoDB database integration
- ✅ RESTful API endpoints
- ✅ Secure API authorization

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Responsive design
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

### Database
- **MongoDB Atlas** - Cloud database (Free tier)

## 📁 Project Structure

```
cognifyz-internship/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── taskController.js     # Task logic
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── tasks.js              # Task routes
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   └── server.js                 # Main server file
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskCard.js
│   │   │   ├── TaskStats.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth state management
│   │   ├── hooks/
│   │   │   └── useTasks.js       # Task management hook
│   │   ├── api/
│   │   │   └── client.js         # Axios configuration
│   │   ├── styles/
│   │   │   └── globals.css       # Global styles
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env.example                  # Environment template
├── package.json                  # Root dependencies
└── README.md                     # This file

```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)
- Git

### Step 1: Clone/Download Project

```bash
# Navigate to your projects folder
cd your-projects-folder

# Copy all files from the provided structure
```

### Step 2: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a free cluster
5. Create a database user
6. Get connection string
7. Copy your connection string

### Step 3: Create .env File

```bash
# In root directory, create .env file
cat > .env << EOF
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/cognifyz_internship?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_12345
PORT=5000
REACT_APP_API_URL=http://localhost:5000/api
EOF
```

Replace with your actual MongoDB URI.

### Step 4: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 5: Run Application

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

Application will open at: **http://localhost:3000**

## 🎯 How to Use

### 1. Sign Up
- Click "Sign up" link on login page
- Enter first name, last name, email
- Create strong password (uppercase + number required)
- Submit form

### 2. Login
- Enter email and password
- Click "Sign In"
- Redirected to dashboard

### 3. Create Tasks
- Click "+ New Task"
- Fill in task details:
  - **Title** (required)
  - **Description** (optional)
  - **Priority** (Low/Medium/High)
  - **Category** (Work/Personal/etc.)
  - **Due Date** (optional)
  - **Tags** (comma-separated)
- Click "Save Task"

### 4. Manage Tasks
- **Edit**: Click edit icon on task card
- **Delete**: Click delete icon on task card
- **Change Status**: Click status buttons (📋 Todo / ⚙️ In Progress / ✅ Completed)
- **Filter**: Use filter buttons at top

### 5. View Statistics
- Dashboard shows:
  - Total tasks
  - Completed tasks
  - Tasks in progress
  - High priority tasks
  - Overall completion percentage
  - Overdue tasks warning

## 📊 How It Covers All 8 Tasks

### **Task 1: HTML Structure & Basic Server Interaction** ✅
- Express.js server with routing
- RESTful endpoints for form handling
- Server-side request processing

### **Task 2: Inline Styles & Server-Side Validation** ✅
- Professional CSS styling system
- Real-time client-side validation
- Server-side form validation
- Error message feedback

### **Task 3: Responsive Design** ✅
- Mobile-first CSS approach
- Responsive grid layouts
- Media queries for all screen sizes
- Works on desktop, tablet, mobile

### **Task 4: Complex Form Validation & DOM Updates** ✅
- Password strength indicator
- Real-time field validation
- Dynamic form updates
- React state management

### **Task 5: API Integration** ✅
- RESTful API endpoints
- Axios HTTP client
- CRUD operations
- Real-time data updates

### **Task 6: Database & Authentication** ✅
- MongoDB database integration
- User model with validation
- JWT token authentication
- Secure API endpoints
- Password hashing with bcryptjs

### **Task 7: Advanced API Features** ✅
- Error handling
- Data filtering & sorting
- Task statistics calculation
- Request validation

### **Task 8: Advanced Server-Side Features** ✅
- CORS middleware
- Body parsing middleware
- Error handling
- Database indexing
- Authorization checks

## 🎥 Recording Demo Video

### What to Show:

1. **Signup/Login (30 seconds)**
   - Show signup page with validation
   - Demonstrate password strength indicator
   - Show login page

2. **Create Tasks (1 minute)**
   - Create several different tasks
   - Show form validation (try invalid data)
   - Show success message

3. **View Dashboard (30 seconds)**
   - Show statistics cards
   - Show kanban board layout
   - Show task counts

4. **Edit & Delete (30 seconds)**
   - Edit a task
   - Delete a task
   - Show confirmation dialogs

5. **Filter & Status (30 seconds)**
   - Use filter buttons
   - Change task status
   - Show filtering in action

6. **Responsive Design (30 seconds)**
   - Resize browser window
   - Show mobile layout
   - Show responsive behavior

### Recording Tips:
- Use OBS Studio (free) or Camtasia
- Record at 1080p or 720p
- Include audio explaining features
- Keep video 3-5 minutes
- Upload to YouTube or LinkedIn

## 📝 LinkedIn Post Template

```
🚀 Completed my #internship project at @Cognifyz Technologies!

Built a professional Task Management Dashboard using:
✅ React.js (Frontend)
✅ Node.js + Express (Backend)
✅ MongoDB (Database)

Features:
📋 User authentication with JWT
✏️ Full CRUD task operations
🎨 Responsive UI/UX design
🔒 Secure API endpoints
📊 Real-time statistics

Demo: [Link to video]
GitHub: [Link if applicable]

Excited to have completed this full-stack development project!

#CognifyzTech #FullStackDevelopment #ReactJS #NodeJS #MongoDB #Internship #WebDevelopment

@CognifyzTechnologies
```

## 🚀 Deployment

### Deploy Frontend (Vercel/Netlify)

```bash
# Build React app
cd client
npm run build

# Upload 'build' folder to Vercel or Netlify
```

### Deploy Backend (Heroku/Railway)

```bash
# Add Procfile
echo "web: npm start" > Procfile

# Deploy to Heroku
heroku create your-app-name
git push heroku main
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Port Already in Use
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check backend CORS configuration
- Ensure frontend URL matches backend settings

## ✨ Key Features Explanation

### Authentication
- Uses JWT tokens stored in localStorage
- Passwords hashed with bcryptjs (10 salt rounds)
- Tokens expire in 7 days
- Automatic logout on token expiration

### Task Management
- Create, read, update, delete tasks
- Filter by status and priority
- Track task progress with statistics
- Overdue task warnings
- Task categorization

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Fast loading times

### Form Validation
- Client-side: instant feedback
- Server-side: data integrity
- Password strength requirements
- Email format validation
- Field length limits

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

## 📋 Submission Checklist

- [ ] All 5+ tasks implemented
- [ ] Application runs without errors
- [ ] All CRUD operations work
- [ ] Form validation works
- [ ] Database integration confirmed
- [ ] Authentication working
- [ ] Responsive design tested
- [ ] No plagiarism (all original code)
- [ ] Video demo recorded
- [ ] LinkedIn post created
- [ ] Files zipped for submission
- [ ] README included
- [ ] Environment variables documented

## 📧 Support

For issues or questions:
- Contact: contact@cognifyz.com
- LinkedIn: @cognifyz-Technologies
- Website: www.cognifyz.com

## 📄 License

This project is created for Cognifyz Technologies internship program.

---

**Created with ❤️ for Cognifyz Full Stack Development Internship**

**Happy coding! 🚀**