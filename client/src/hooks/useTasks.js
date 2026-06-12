import { useState, useCallback } from 'react';
import api from '../api/client';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/tasks?${params}`);
      setTasks(response.data.tasks);
      return response.data.tasks;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prevTasks => [response.data.task, ...prevTasks]);
      return response.data.task;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? response.data.task : t));
      return response.data.task;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    error,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
