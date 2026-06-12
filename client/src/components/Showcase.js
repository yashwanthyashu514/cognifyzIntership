import React, { useState, useEffect } from 'react';
import {
  AlertCircle, CheckCircle, Code, Smartphone, Tablet, Monitor
} from 'lucide-react';
import './Showcase.css';

const Showcase = () => {
  // Navigation states
  const [activeLevel, setActiveLevel] = useState('level1'); // 'level1' or 'level2'
  const [activeTask, setActiveTask] = useState('task1'); // level1: 'task1' | 'task2', level2: 'task3' | 'task4'

  // Code inspection states
  const [showCode, setShowCode] = useState(false);

  // Level 1 Task 1 Form States
  const [t1FormData, setT1FormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    feedback: ''
  });
  const [t1SubmittedData, setT1SubmittedData] = useState(null);
  const [t1Error, setT1Error] = useState(null);

  // Level 1 Task 2 Validation States
  const [t2FormData, setT2FormData] = useState({
    username: '',
    email: '',
    phone: '',
    age: ''
  });
  const [t2Errors, setT2Errors] = useState([]);
  const [t2Success, setT2Success] = useState(false);
  const [t2Submissions, setT2Submissions] = useState([
    {
      id: 1,
      username: 'yash_m',
      email: 'yash@cognifyz.com',
      phone: '9876543210',
      age: 21,
      timestamp: '12:30:15 PM'
    }
  ]);

  // Level 2 Task 3 Responsive Simulator States
  const [simWidth, setSimWidth] = useState(800); // 320 to 1000px

  // Level 2 Task 4 Mock SPA Router & DB States
  const [spaHash, setSpaHash] = useState('home'); // 'home' | 'register' | 'users'
  const [spaUsers, setSpaUsers] = useState([
    { id: 1, name: 'Yashwanth M', email: 'yash@cognifyz.com', strength: 'Strong' },
    { id: 2, name: 'John Doe', email: 'john@example.com', strength: 'Medium' }
  ]);
  const [spaFormData, setSpaFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const [spaPasswordScore, setSpaPasswordScore] = useState(0);
  const [spaPasswordChecks, setSpaPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false
  });
  const [spaToast, setSpaToast] = useState(null);

  // Synchronize Active Task when level changes
  useEffect(() => {
    if (activeLevel === 'level1') {
      setActiveTask('task1');
    } else {
      setActiveTask('task3');
    }
    setShowCode(false);
  }, [activeLevel]);

  // Toast helper for Level 2 Task 4 Mock SPA
  const triggerSpaToast = (msg) => {
    setSpaToast(msg);
    setTimeout(() => {
      setSpaToast(null);
    }, 3000);
  };

  // Level 1 Task 1: Basic Form Submit handler
  const handleT1Submit = (e) => {
    e.preventDefault();
    setT1Error(null);
    setT1SubmittedData(null);

    const { name, email, feedback } = t1FormData;
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setT1Error('Please fill in all required fields (Name, Email, Feedback)');
      return;
    }

    setT1SubmittedData({ ...t1FormData });
  };

  // Level 1 Task 2: Input validation checker
  const handleT2Submit = (e) => {
    e.preventDefault();
    setT2Errors([]);
    setT2Success(false);

    const errors = [];
    const { username, email, phone, age } = t2FormData;

    // Username validation
    if (!username.trim() || username.length < 3) {
      errors.push('Username must be at least 3 characters long');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }

    // Email validation
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please provide a valid email address');
    }

    // Phone validation
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      errors.push('Phone number must be exactly 10 digits');
    }

    // Age validation
    const parsedAge = parseInt(age);
    if (!age || isNaN(parsedAge) || parsedAge < 18 || parsedAge > 100) {
      errors.push('Age must be a number between 18 and 100');
    }

    if (errors.length > 0) {
      setT2Errors(errors);
      return;
    }

    // Success -> Store details
    const newRecord = {
      id: Date.now(),
      username,
      email,
      phone,
      age: parsedAge,
      timestamp: new Date().toLocaleTimeString()
    };

    setT2Submissions(prev => [newRecord, ...prev]);
    setT2Success(true);
    setT2FormData({ username: '', email: '', phone: '', age: '' });
  };

  // Level 2 Task 4: Password check score generator
  const handleSpaPasswordChange = (e) => {
    const val = e.target.value;
    setSpaFormData(prev => ({ ...prev, password: val }));

    const checks = {
      length: val.length >= 8,
      upper: /[A-Z]/.test(val),
      lower: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      symbol: /[^a-zA-Z0-9]/.test(val)
    };

    setSpaPasswordChecks(checks);

    let score = 0;
    Object.values(checks).forEach(c => {
      if (c) score++;
    });
    setSpaPasswordScore(score);
  };

  const getPasswordStrengthLabel = () => {
    if (spaFormData.password.length === 0) return { text: 'Empty', class: 'text-weak', color: 'transparent' };
    if (spaPasswordScore <= 2) return { text: 'Weak', class: 'text-weak', color: 'var(--error)' };
    if (spaPasswordScore <= 4) return { text: 'Medium', class: 'text-medium', color: 'var(--warning)' };
    return { text: 'Strong', class: 'text-strong', color: 'var(--success)' };
  };

  // Submit SPA user registration
  const handleSpaRegisterSubmit = (e) => {
    e.preventDefault();
    if (!spaFormData.fullname.trim() || !spaFormData.email.trim() || spaPasswordScore < 5) return;

    const strengthLabel = getPasswordStrengthLabel().text;

    const newUser = {
      id: Date.now(),
      name: spaFormData.fullname,
      email: spaFormData.email,
      strength: strengthLabel
    };

    setSpaUsers(prev => [...prev, newUser]);
    setSpaFormData({ fullname: '', email: '', password: '' });
    setSpaPasswordScore(0);
    setSpaPasswordChecks({ length: false, upper: false, lower: false, number: false, symbol: false });

    triggerSpaToast('Profile created successfully! Redirecting...');
    setTimeout(() => {
      setSpaHash('users');
    }, 600);
  };

  // Delete SPA User
  const handleSpaDeleteUser = (id, name) => {
    setSpaUsers(prev => prev.filter(u => u.id !== id));
    triggerSpaToast(`Deleted profile: ${name}`);
  };

  // Get responsive simulator breakpoints
  const getBreakpointLabel = () => {
    if (simWidth < 576) return { name: 'Mobile (XS)', icon: <Smartphone size={16} />, color: '#ef4444' };
    if (simWidth < 768) return { name: 'Tablet (SM)', icon: <Tablet size={16} />, color: '#f59e0b' };
    return { name: 'Desktop (LG)', icon: <Monitor size={16} />, color: '#10b981' };
  };

  return (
    <div className="showcase-container fade-in">
      <header className="showcase-header">
        <h1>Interactive Prototype Showcase</h1>
        <p className="text-muted">Explore and interact with the verified full-stack solutions and frontend client prototypes built for this project.</p>
      </header>

      {/* Main Level selector tabs */}
      <div className="level-tabs">
        <button
          className={`level-tab ${activeLevel === 'level1' ? 'active' : ''}`}
          onClick={() => setActiveLevel('level1')}
        >
          Backend Integrations (Express & Node)
        </button>
        <button
          className={`level-tab ${activeLevel === 'level2' ? 'active' : ''}`}
          onClick={() => setActiveLevel('level2')}
        >
          Frontend Prototypes (Client-side SPA)
        </button>
      </div>

      <div className="task-grid-menu">
        {/* Sidebar task menus */}
        <aside className="task-list-side">
          {activeLevel === 'level1' ? (
            <>
              <button
                className={`task-menu-item ${activeTask === 'task1' ? 'active' : ''}`}
                onClick={() => setActiveTask('task1')}
              >
                <h3>Template Engine (EJS)</h3>
                <p>Express rendering & Form handling</p>
              </button>
              <button
                className={`task-menu-item ${activeTask === 'task2' ? 'active' : ''}`}
                onClick={() => setActiveTask('task2')}
              >
                <h3>Validation Engine</h3>
                <p>Server-side check & list rendering</p>
              </button>
            </>
          ) : (
            <>
              <button
                className={`task-menu-item ${activeTask === 'task3' ? 'active' : ''}`}
                onClick={() => setActiveTask('task3')}
              >
                <h3>Responsive Layout</h3>
                <p>Bootstrap Grid & keyframes</p>
              </button>
              <button
                className={`task-menu-item ${activeTask === 'task4' ? 'active' : ''}`}
                onClick={() => setActiveTask('task4')}
              >
                <h3>SPA Router & Rule Engine</h3>
                <p>Hash routing & Password checks</p>
              </button>
            </>
          )}
        </aside>

        {/* Main interactive area */}
        <main className="card task-content-card">
          {activeTask === 'task1' && (
            <div>
              <h2 className="task-section-title">Form Handling & Server-Side Rendering</h2>
              <div className="task-explanation">
                <strong>Concept:</strong> Set up an Express server using urlencoded body parser. EJS templates process form inputs (Name, Email, Role, Feedback) on submission, rendering result templates dynamically.
              </div>

              <div className="mock-ejs-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot dot-red"></span>
                    <span className="window-dot dot-yellow"></span>
                    <span className="window-dot dot-green"></span>
                  </div>
                  <span>http://ejs-renderer.prototype</span>
                  <div style={{ width: '40px' }}></div>
                </div>

                <div className="window-content">
                  {!t1SubmittedData ? (
                    <form onSubmit={handleT1Submit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                      <h3 className="mb-md text-center">Feedback Registration</h3>

                      {t1Error && (
                        <div className="validation-errors-box">
                          <div className="validation-errors-title">
                            <AlertCircle size={16} />
                            <span>Submit Error:</span>
                          </div>
                          <span style={{ fontSize: '0.85rem' }}>{t1Error}</span>
                        </div>
                      )}

                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={t1FormData.name}
                          onChange={(e) => setT1FormData(p => ({ ...p, name: e.target.value }))}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={t1FormData.email}
                            onChange={(e) => setT1FormData(p => ({ ...p, email: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>Role</label>
                          <select
                            value={t1FormData.role}
                            onChange={(e) => setT1FormData(p => ({ ...p, role: e.target.value }))}
                          >
                            <option value="Student">Student</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Feedback Description *</label>
                        <textarea
                          placeholder="Your comments..."
                          value={t1FormData.feedback}
                          onChange={(e) => setT1FormData(p => ({ ...p, feedback: e.target.value }))}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '1rem' }}>
                        Submit Feedback
                      </button>
                    </form>
                  ) : (
                    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                      <div className="success-box mb-md">
                        <CheckCircle size={20} />
                        <span>Form Submitted Successfully to EJS result template!</span>
                      </div>

                      <div className="card" style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left', marginBottom: '1.5rem' }}>
                        <h4 className="mb-md" style={{ color: 'var(--primary-light)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                          Submitted Data (Rendered result.ejs)
                        </h4>
                        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                          <p><strong>Name:</strong> {t1SubmittedData.name}</p>
                          <p><strong>Email:</strong> {t1SubmittedData.email}</p>
                          <p><strong>Role:</strong> {t1SubmittedData.role}</p>
                          <p><strong>Feedback:</strong> {t1SubmittedData.feedback}</p>
                        </div>
                      </div>

                      <button className="btn btn-secondary" onClick={() => {
                        setT1SubmittedData(null);
                        setT1FormData({ name: '', email: '', role: 'Student', feedback: '' });
                      }}>
                        Register New Response
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button className="code-inspector-btn" onClick={() => setShowCode(!showCode)}>
                <Code size={14} />
                <span>{showCode ? 'Hide Server Code' : 'Inspect Server Code (Express)'}</span>
              </button>

              {showCode && (
                <pre className="code-block-inspect">
                  {`app.post('/submit', (req, res) => {
  const { name, email, role, feedback } = req.body;
  if (!name || !email || !feedback) {
    return res.render('index', { 
      error: 'Please fill in all required fields' 
    });
  }
  // Render result.ejs
  res.render('result', { name, email, role, feedback });
});`}
                </pre>
              )}
            </div>
          )}

          {activeTask === 'task2' && (
            <div>
              <h2 className="task-section-title">Input Verification & State Synchronization</h2>
              <div className="task-explanation">
                <strong>Concept:</strong> Integrates server-side schema verification using `express-validator`. Validates length (username &gt;= 3), correct format (email), phone (exactly 10 digits), and age range (18-100), listing errors or rendering dynamic content.
              </div>

              <div className="mock-ejs-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="window-dot dot-red"></span>
                    <span className="window-dot dot-yellow"></span>
                    <span className="window-dot dot-green"></span>
                  </div>
                  <span>http://validation-engine.prototype</span>
                  <div style={{ width: '40px' }}></div>
                </div>

                <div className="window-content validation-window-layout">
                  {/* Left Side - Validation Form */}
                  <div>
                    <form onSubmit={handleT2Submit}>
                      <h4 className="mb-md">Register Profile</h4>

                      {t2Errors.length > 0 && (
                        <div className="validation-errors-box">
                          <div className="validation-errors-title">
                            <AlertCircle size={16} />
                            <span>Validation Failed ({t2Errors.length} Errors):</span>
                          </div>
                          <ul className="validation-errors-list">
                            {t2Errors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {t2Success && (
                        <div className="success-box">
                          <CheckCircle size={16} />
                          <span>Validation passed! Record added.</span>
                        </div>
                      )}

                      <div className="form-group">
                        <label>Username * (min. 3 letters/numbers)</label>
                        <input
                          type="text"
                          placeholder="e.g. yash_m"
                          value={t2FormData.username}
                          onChange={(e) => setT2FormData(p => ({ ...p, username: e.target.value }))}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="text"
                          placeholder="e.g. john@example.com"
                          value={t2FormData.email}
                          onChange={(e) => setT2FormData(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Phone * (10 digits)</label>
                          <input
                            type="text"
                            placeholder="e.g. 9876543210"
                            value={t2FormData.phone}
                            onChange={(e) => setT2FormData(p => ({ ...p, phone: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>Age * (18 - 100)</label>
                          <input
                            type="number"
                            placeholder="Age"
                            value={t2FormData.age}
                            onChange={(e) => setT2FormData(p => ({ ...p, age: e.target.value }))}
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '0.5rem' }}>
                        Register Profile
                      </button>
                    </form>
                  </div>

                  {/* Right Side - Table view */}
                  <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', maxHeight: '420px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0 }}>Temp Records</h4>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setT2Submissions([])}
                        disabled={t2Submissions.length === 0}
                      >
                        Clear
                      </button>
                    </div>

                    {t2Submissions.length === 0 ? (
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textAlign: 'center', marginTop: '3rem' }}>
                        No records submitted yet.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {t2Submissions.map(rec => (
                          <div
                            key={rec.id}
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid var(--border)',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              fontSize: '0.85rem',
                              animation: 'fadeIn 0.3s ease'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <strong>@{rec.username}</strong>
                              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{rec.timestamp}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }}>{rec.email}</p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                              <span>📞 {rec.phone}</span>
                              <span>🎂 {rec.age} yrs</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="validation-rules-list-container mb-md" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Validation Rules (express-validator schema):</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary-light)' }}>•</span>
                    <div>
                      <strong>Username Check</strong>
                      <div style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-tertiary)' }}>At least 3 characters. Alphanumeric & underscores only.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary-light)' }}>•</span>
                    <div>
                      <strong>Email Format</strong>
                      <div style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-tertiary)' }}>Must match standard email format (name@domain.com).</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary-light)' }}>•</span>
                    <div>
                      <strong>Phone Number</strong>
                      <div style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-tertiary)' }}>Must be exactly 10 digits. No letters or spaces.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary-light)' }}>•</span>
                    <div>
                      <strong>Age Restriction</strong>
                      <div style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-tertiary)' }}>Must be an integer between 18 and 100.</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="code-inspector-btn" onClick={() => setShowCode(!showCode)}>
                <Code size={14} />
                <span>{showCode ? 'Hide Validation Rules' : 'Inspect Server Validation Code (express-validator)'}</span>
              </button>

              {showCode && (
                <pre className="code-block-inspect">
                  {`body('username')
  .trim()
  .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
  .matches(/^[a-zA-Z0-9_]+$/).withMessage('Letters, numbers, and underscores only'),
body('email')
  .trim().isEmail().withMessage('Please provide a valid email address'),
body('phone')
  .trim().matches(/^\\d{10}$/).withMessage('Phone number must be exactly 10 digits'),
body('age')
  .isInt({ min: 18, max: 100 }).withMessage('Age must be a number between 18 and 100')`}
                </pre>
              )}
            </div>
          )}

          {activeTask === 'task3' && (
            <div>
              <h2 className="task-section-title">Adaptive Viewports & Keyframe Animations</h2>
              <div className="task-explanation">
                <strong>Concept:</strong> Implementing cross-browser responsive layouts using Bootstrap 5 Flexbox/Grid systems, incorporating micro-animations and CSS media query viewport breakpoints.
              </div>

              <div className="simulator-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Drag slider to simulate device screen resizing:</span>
                  <strong style={{ color: 'var(--primary-light)' }}>Simulated Width: {simWidth}px</strong>
                </div>
                <div className="slider-group">
                  <Smartphone size={16} />
                  <input
                    type="range"
                    min="320"
                    max="1000"
                    value={simWidth}
                    onChange={(e) => setSimWidth(parseInt(e.target.value))}
                  />
                  <Monitor size={16} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="preset-buttons">
                    <button className={`preset-btn ${simWidth === 375 ? 'active' : ''}`} onClick={() => setSimWidth(375)}>Mobile (375px)</button>
                    <button className={`preset-btn ${simWidth === 720 ? 'active' : ''}`} onClick={() => setSimWidth(720)}>Tablet (720px)</button>
                    <button className={`preset-btn ${simWidth === 960 ? 'active' : ''}`} onClick={() => setSimWidth(960)}>Desktop (960px)</button>
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <span style={{ color: getBreakpointLabel().color, display: 'inline-flex', alignItems: 'center' }}>
                      {getBreakpointLabel().icon}
                    </span>
                    <strong>{getBreakpointLabel().name}</strong>
                  </div>
                </div>
              </div>

              {simWidth < 500 && (
                <div className="responsive-warning">
                  ℹ️ Simulating mobile view. Columns collapse vertically.
                </div>
              )}

              <div className="iframe-like-container" style={{ width: `${simWidth}px` }}>
                <div className="mock-bootstrap-showcase">
                  {/* Mock Navbar */}
                  <div className="mock-bs-navbar">
                    <span className="mock-bs-logo">
                      <span style={{ width: '12px', height: '12px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '3px' }}></span>
                      COGNIFYZ SHOWCASE
                    </span>
                    {simWidth > 600 ? (
                      <div className="mock-bs-nav-links">
                        <span>Home</span>
                        <span>Features</span>
                        <span>Metrics</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>☰ Menu</span>
                    )}
                  </div>

                  {/* Mock Hero row */}
                  <div className="mock-bs-hero">
                    <div className="mock-bs-hero-text">
                      <span style={{ fontSize: '0.65rem', background: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '3px 8px', borderRadius: '10px', fontWeight: 600 }}>TASK 3</span>
                      <h3 style={{ fontSize: '1.5rem', margin: '6px 0 10px 0', fontWeight: 700 }}>Aesthetics Meet Grid Scalability</h3>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        Responsive layout designed with modern keyframe animations and translucent grid items.
                      </p>
                    </div>

                    <div className="mock-bs-hero-panel">
                      <h5 style={{ color: '#c084fc', fontSize: '0.85rem', marginBottom: '8px' }}>Interactive Panel</h5>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Grid items float and adapt fluidly depending on active breakpoint width.</p>
                    </div>
                  </div>

                  {/* Mock grid cards */}
                  <div className="mock-bs-grid-cards">
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🚀</span>
                      <h6 style={{ margin: '6px 0 4px 0', fontSize: '0.8rem' }}>Transitions</h6>
                      <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Subtle micro-interactions on hovering elements.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🎭</span>
                      <h6 style={{ margin: '6px 0 4px 0', fontSize: '0.8rem' }}>Keyframes</h6>
                      <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Looping animations to guide user attention.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>📐</span>
                      <h6 style={{ margin: '6px 0 4px 0', fontSize: '0.8rem' }}>Fluid Grid</h6>
                      <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Breakpoints render perfectly on all devices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTask === 'task4' && (
            <div>
              <h2 className="task-section-title">Hash-Based Client Router & Password Strength Rules</h2>
              <div className="task-explanation">
                <strong>Concept:</strong> A client-side Single Page Application (SPA) utilizing hash-based routing. Features a live password strength validation engine (checking length, casings, digits, symbols), dynamic DOM rendering (without reloads), and a custom toast notification service.
              </div>

              {/* Toast notifier simulated */}
              {spaToast && (
                <div className="toast slide-in-right" style={{ bottom: '1.5rem', right: '1.5rem', padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
                  <span>{spaToast}</span>
                </div>
              )}

              <div className="mock-spa-wrapper">
                {/* Router Navbar */}
                <div className="spa-nav">
                  <span className="spa-brand">
                    <span style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                    SPA App
                  </span>
                  <div className="spa-nav-links">
                    <button
                      className={`spa-nav-link ${spaHash === 'home' ? 'active' : ''}`}
                      onClick={() => setSpaHash('home')}
                    >
                      Home
                    </button>
                    <button
                      className={`spa-nav-link ${spaHash === 'register' ? 'active' : ''}`}
                      onClick={() => setSpaHash('register')}
                    >
                      Register Form
                    </button>
                    <button
                      className={`spa-nav-link ${spaHash === 'users' ? 'active' : ''}`}
                      onClick={() => setSpaHash('users')}
                    >
                      User Directory ({spaUsers.length})
                    </button>
                  </div>
                </div>

                {/* SPA View Contents */}
                <div className="spa-body">
                  {spaHash === 'home' && (
                    <div style={{ animation: 'fadeIn 0.2s ease' }}>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Single Page Client App</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        This simulated SPA features client-side tab switching without full browser reloads. It handles live DOM synced tables and strength rule validation indicators.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--primary-light)', fontSize: '0.8rem' }}>Password Strength Checks</strong>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Live regex checklists validation for secure user keys.</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                          <strong style={{ color: 'var(--success)', fontSize: '0.8rem' }}>Live List Table Sync</strong>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Records render instantly upon form completion without reloading page.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {spaHash === 'register' && (
                    <div style={{ animation: 'fadeIn 0.2s ease', maxWidth: '480px' }}>
                      <h4 style={{ marginBottom: '4px' }}>Register Local Profile</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Live password checks block submission until rules pass.</p>

                      <form onSubmit={handleSpaRegisterSubmit}>
                        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                          <label style={{ fontSize: '0.75rem' }}>Full Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. John Doe"
                            required
                            value={spaFormData.fullname}
                            onChange={(e) => setSpaFormData(p => ({ ...p, fullname: e.target.value }))}
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                          <label style={{ fontSize: '0.75rem' }}>Email *</label>
                          <input
                            type="email"
                            placeholder="e.g. john@example.com"
                            required
                            value={spaFormData.email}
                            onChange={(e) => setSpaFormData(p => ({ ...p, email: e.target.value }))}
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                          <label style={{ fontSize: '0.75rem' }}>Password * (Min. 8 chars, uppercase, lowercase, digit, symbol)</label>
                          <input
                            type="password"
                            placeholder="Type a password"
                            required
                            value={spaFormData.password}
                            onChange={handleSpaPasswordChange}
                          />

                          {/* Colored meter bar */}
                          <div className="strength-bar-wrapper">
                            {[1, 2, 3, 4, 5].map((idx) => (
                              <div
                                key={idx}
                                className="strength-chunk"
                                style={{
                                  background: spaFormData.password.length > 0 && idx <= spaPasswordScore
                                    ? getPasswordStrengthLabel().color
                                    : 'transparent'
                                }}
                              ></div>
                            ))}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.7rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Live Strength:</span>
                            <span className={getPasswordStrengthLabel().class}>{getPasswordStrengthLabel().text}</span>
                          </div>

                          {/* Rule Checklist */}
                          <div className="strength-criteria">
                            <div className={`criterion ${spaPasswordChecks.length ? 'valid' : ''}`}>
                              <span className="criterion-dot"></span>
                              <span>At least 8 characters</span>
                            </div>
                            <div className={`criterion ${spaPasswordChecks.upper ? 'valid' : ''}`}>
                              <span className="criterion-dot"></span>
                              <span>Uppercase letter (A-Z)</span>
                            </div>
                            <div className={`criterion ${spaPasswordChecks.lower ? 'valid' : ''}`}>
                              <span className="criterion-dot"></span>
                              <span>Lowercase letter (a-z)</span>
                            </div>
                            <div className={`criterion ${spaPasswordChecks.number ? 'valid' : ''}`}>
                              <span className="criterion-dot"></span>
                              <span>Contains number (0-9)</span>
                            </div>
                            <div className={`criterion ${spaPasswordChecks.symbol ? 'valid' : ''}`} style={{ gridColumn: 'span 2' }}>
                              <span className="criterion-dot"></span>
                              <span>Contains special symbol (e.g. @, #, $, !)</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{ marginTop: '0.75rem' }}
                          disabled={spaPasswordScore < 5 || !spaFormData.fullname.trim() || !spaFormData.email.trim()}
                        >
                          Create Local Profile
                        </button>
                      </form>
                    </div>
                  )}

                  {spaHash === 'users' && (
                    <div style={{ animation: 'fadeIn 0.2s ease' }}>
                      <h4 style={{ marginBottom: '1rem' }}>User Directory</h4>

                      <div style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                        <table className="mock-table">
                          <thead>
                            <tr>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Password Strength</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {spaUsers.length === 0 ? (
                              <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '1.5rem' }}>
                                  No local profiles registered.
                                </td>
                              </tr>
                            ) : (
                              spaUsers.map(user => (
                                <tr key={user.id}>
                                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    <span className={`strength-pill ${user.strength === 'Strong' ? 'pill-strong' :
                                        user.strength === 'Medium' ? 'pill-medium' : 'pill-weak'
                                      }`}>
                                      {user.strength}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      style={{ padding: '2px 8px', fontSize: '0.75rem', borderColor: 'var(--error)', color: 'var(--error)' }}
                                      onClick={() => handleSpaDeleteUser(user.id, user.name)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Showcase;
