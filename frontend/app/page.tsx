'use client';

import { useState } from 'react';
import AuthComponent from '@/components/AuthComponent';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState<{ id: number | null; title: string; description: string }>({ id: null, title: '', description: '' });
  const [userId, setUserId] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (uid: string) => {
    setUserId(uid);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setUserId('');
    setIsAuthenticated(false);
    setTasks([]);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const newT: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      created_at: new Date().toISOString(),
    };
    setTasks([newT, ...tasks]);
    setNewTask({ title: '', description: '' });
  };

  const updateTask = () => {
    if (editTask.id === null) return;
    setTasks(tasks.map(t => t.id === editTask.id ? { ...t, title: editTask.title, description: editTask.description } : t));
    setEditTask({ id: null, title: '', description: '' });
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          ✨ Todo App
        </h1>
        <div className="max-w-md mx-auto">
          <AuthComponent
            onLogin={handleLogin}
            onLogout={handleLogout}
            isAuthenticated={isAuthenticated}
            userId={userId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
           Todo App
        </h1>
        <AuthComponent
          onLogin={handleLogin}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userId={userId}
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* ADD TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
          <h2 className="font-bold mb-3 text-purple-800 text-xl">Add Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full mb-2 p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full mb-2 p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          />
          <button
            onClick={addTask}
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transform transition-all shadow-md hover:shadow-xl"
          >
            Add
          </button>
        </div>

        {/* VIEW TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-200 to-teal-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-y-auto max-h-72">
          <h2 className="font-bold mb-3 text-green-800 text-xl">View Tasks</h2>
          {tasks.length === 0 ? <p className="text-gray-500">No tasks</p> : tasks.map(t => (
            <div key={t.id} className="border-b py-1">
              <p className={`${t.completed ? 'line-through text-green-700' : 'text-gray-800'}`}>{t.title}</p>
            </div>
          ))}
        </div>

        {/* UPDATE TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
          <h2 className="font-bold mb-3 text-yellow-800 text-xl">Update Task</h2>
          <select
            value={editTask.id || ''}
            onChange={e => {
              const id = Number(e.target.value);
              const t = tasks.find(t => t.id === id);
              if (t) setEditTask({ id: t.id, title: t.title, description: t.description });
            }}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          >
            <option value="">Select Task</option>
            {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <input
            type="text"
            placeholder="Title"
            value={editTask.title}
            onChange={e => setEditTask({ ...editTask, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={editTask.description}
            onChange={e => setEditTask({ ...editTask, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
          <button
            onClick={updateTask}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transform transition-all shadow-md hover:shadow-xl"
          >
            Update
          </button>
        </div>

        {/* COMPLETE / DELETE */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-200 to-pink-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-y-auto max-h-72">
          <h2 className="font-bold mb-3 text-red-700 text-xl">Complete / Delete</h2>
          {tasks.length === 0 ? <p className="text-gray-500">No tasks</p> : tasks.map(t => (
            <div key={t.id} className="flex justify-between items-center mb-2">
              <span className={`${t.completed ? 'line-through text-green-700' : 'text-gray-800'}`}>{t.title}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleComplete(t.id)}
                  className={`px-3 py-1 rounded-lg text-white font-semibold ${t.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} transition-all`}
                >
                  {t.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
