import React, { useEffect, useState, useCallback } from 'react';
import { useTasks } from '../hooks/useTasks';
import { 
  Plus, Search, Calendar, Tag, AlertCircle, CheckCircle, 
  Clock, Trash2, Edit, Filter, ListTodo, PlusCircle, Sparkles
} from 'lucide-react';
import api from '../api/client';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks, loading, getTasks, createTask, updateTask, deleteTask } = useTasks();
  
  // States
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    highPriority: 0
  });
  
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: ''
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    category: 'general',
    tagsInput: ''
  });
  
  const [formError, setFormError] = useState('');
  
  // Fetch stats from backend
  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/tasks/stats/summary');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      // Fallback: Calculate stats locally
      calculateLocalStats(tasks);
    }
  }, [tasks]);

  const calculateLocalStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter(t => t.status === 'completed').length;
    const inProgress = taskList.filter(t => t.status === 'in-progress').length;
    const todo = taskList.filter(t => t.status === 'todo').length;
    const highPriority = taskList.filter(t => t.priority === 'high').length;
    setStats({ total, completed, inProgress, todo, highPriority });
  };

  // Load tasks on mount or filter change
  useEffect(() => {
    getTasks(filters);
  }, [filters, getTasks]);

  // Sync stats when tasks state updates
  useEffect(() => {
    fetchStats();
  }, [tasks, fetchStats]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusTabChange = (statusVal) => {
    setFilters(prev => ({ ...prev, status: statusVal }));
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      category: 'general',
      tagsInput: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      status: task.status || 'todo',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      category: task.category || 'general',
      tagsInput: task.tags ? task.tags.join(', ') : ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.title.trim()) {
      setFormError('Task title is required');
      return;
    }
    
    const tags = formData.tagsInput
      ? formData.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];
      
    const taskData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate || null,
      category: formData.category,
      tags
    };

    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      getTasks(filters);
      fetchStats();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      await updateTask(task._id, { status: newStatus });
      getTasks(filters);
      fetchStats();
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        getTasks(filters);
        fetchStats();
      } catch (err) {
        console.error('Failed to delete task', err);
      }
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-info';
    }
  };



  // UI rendering starts here
  return (
    <div className="dashboard-container fade-in">
      {/* Stats Section */}
      <header className="dashboard-header">
        <div className="header-title-wrapper">
          <h1>My Workspace</h1>
          <p className="text-muted">Manage, track, and complete your tasks efficiently.</p>
        </div>
        <button className="btn btn-primary create-task-btn" onClick={handleOpenCreateModal} id="create-task-btn">
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </header>

      {/* Stats Cards */}
      <section className="stats-grid grid grid-3">
        <div className="card stat-card total-tasks">
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <h2 className="stat-value">{stats.total}</h2>
            <div className="stat-progress-container">
              <div className="stat-progress-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="stat-icon-wrapper">
            <ListTodo size={24} />
          </div>
        </div>

        <div className="card stat-card completed-tasks">
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <h2 className="stat-value">{stats.completed}</h2>
            <div className="stat-progress-container">
              <div 
                className="stat-progress-bar bg-success" 
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-icon-wrapper text-success">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="card stat-card in-progress-tasks">
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <h2 className="stat-value">{stats.inProgress + stats.todo}</h2>
            <div className="stat-progress-container">
              <div 
                className="stat-progress-bar bg-warning" 
                style={{ width: `${stats.total > 0 ? ((stats.inProgress + stats.todo) / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-icon-wrapper text-warning">
            <Clock size={24} />
          </div>
        </div>
      </section>

      {/* Filters Toolbar */}
      <section className="toolbar-section card">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search tasks by title, description or tags..."
            id="task-search-input"
          />
        </div>

        <div className="toolbar-filters">
          <div className="filter-group-horizontal">
            <Filter size={16} className="filter-icon" />
            <select 
              name="priority" 
              value={filters.priority} 
              onChange={handleFilterChange}
              id="priority-filter-select"
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select 
              name="category" 
              value={filters.category} 
              onChange={handleFilterChange}
              id="category-filter-select"
            >
              <option value="">All Categories</option>
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>
        </div>
      </section>

      {/* Status Tabs */}
      <div className="status-tabs-container">
        <div className="status-tabs">
          <button 
            className={`status-tab ${filters.status === '' ? 'active' : ''}`}
            onClick={() => handleStatusTabChange('')}
          >
            All Tasks
          </button>
          <button 
            className={`status-tab ${filters.status === 'todo' ? 'active' : ''}`}
            onClick={() => handleStatusTabChange('todo')}
          >
            Todo
          </button>
          <button 
            className={`status-tab ${filters.status === 'in-progress' ? 'active' : ''}`}
            onClick={() => handleStatusTabChange('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`status-tab ${filters.status === 'completed' ? 'active' : ''}`}
            onClick={() => handleStatusTabChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Tasks Section */}
      {loading && tasks.length === 0 ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-tasks-card card text-center">
          <div className="empty-icon-wrapper">
            <Sparkles size={40} />
          </div>
          <h3>No Tasks Found</h3>
          <p className="text-muted">Create a task to get started or adjust your active filters.</p>
          <button className="btn btn-primary mt-md" onClick={handleOpenCreateModal}>
            <PlusCircle size={18} />
            <span>Create First Task</span>
          </button>
        </div>
      ) : (
        <div className="tasks-grid grid grid-3">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className={`task-card card ${task.status === 'completed' ? 'completed-task-card' : ''}`}
            >
              <div className="task-card-header">
                <span className={`badge ${getPriorityClass(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <span className="task-category">
                  {task.category}
                </span>
              </div>

              <div className="task-card-body">
                <div className="task-title-row">
                  <button 
                    onClick={() => handleToggleComplete(task)} 
                    className={`checkbox-btn ${task.status === 'completed' ? 'checked' : ''}`}
                    aria-label={task.status === 'completed' ? 'Mark unfinished' : 'Mark complete'}
                  >
                    {task.status === 'completed' ? <CheckCircle size={20} /> : <div className="checkbox-empty"></div>}
                  </button>
                  <h3 className="task-title">{task.title}</h3>
                </div>
                <p className="task-description text-muted">{task.description}</p>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div className="task-tags-list">
                  {task.tags.map((tag, i) => (
                    <span key={i} className="task-tag">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="task-card-footer">
                <div className="task-due-date text-muted">
                  <Calendar size={14} />
                  <span>
                    {task.dueDate 
                      ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'No due date'}
                  </span>
                </div>

                <div className="task-card-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleOpenEditModal(task)}
                    title="Edit task"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteTask(task._id)}
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Creation / Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content card fade-in">
            <div className="modal-header">
              <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            {formError && (
              <div className="alert alert-error">
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="task-form">
              <div className="form-group">
                <label htmlFor="task-title">Title *</label>
                <input
                  id="task-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Task title"
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                  id="task-description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Task description details..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="task-priority">Priority</label>
                  <select
                    id="task-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="task-status">Status</label>
                  <select
                    id="task-status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="task-dueDate">Due Date</label>
                  <input
                    id="task-dueDate"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="task-category">Category</label>
                  <select
                    id="task-category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="task-tags">Tags (comma separated)</label>
                <input
                  id="task-tags"
                  type="text"
                  name="tagsInput"
                  value={formData.tagsInput}
                  onChange={handleFormChange}
                  placeholder="e.g. documentation, bug, feature"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="task-submit-btn">
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
