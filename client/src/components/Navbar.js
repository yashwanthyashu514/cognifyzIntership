import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, User as UserIcon, BookOpen, Layers } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
          <div className="logo-icon">
            <CheckSquare size={22} color="white" />
          </div>
          <span>Cognifyz Tasks</span>
        </div>

        {/* Navigation Links (visible when authenticated) */}
        {user && (
          <div className="navbar-links-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className={`nav-link-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
              title="Task Management Workspace"
            >
              <Layers size={15} />
              <span>Workspace</span>
            </button>
            <button 
              onClick={() => navigate('/showcase')} 
              className={`nav-link-btn ${location.pathname === '/showcase' ? 'active' : ''}`}
              title="Interactive Showcase"
            >
              <BookOpen size={15} />
              <span>Showcase</span>
            </button>
          </div>
        )}

        {/* User Profile & Logout (visible when authenticated) */}
        {user && (
          <div className="navbar-actions">
            <div className="user-profile-summary">
              <div className="user-avatar">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.firstName} />
                ) : (
                  <UserIcon size={16} />
                )}
              </div>
              <span className="user-name-greeting">
                Hello, <strong>{user.firstName}</strong>
              </span>
            </div>

            <button 
              onClick={handleLogout} 
              className="btn btn-secondary btn-sm logout-btn"
              title="Sign out from account"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
