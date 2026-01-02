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
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Todo App
        </h1>

        <AuthComponent
          onLogin={handleLogin}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userId={userId}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* ADD TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 shadow-lg">
          <h2 className="font-bold mb-3 text-purple-800 text-lg">Add Task</h2>

          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <button
            onClick={addTask}
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold"
          >
            Add
          </button>
        </div>

        {/* VIEW TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-200 to-teal-200 shadow-lg max-h-[300px] overflow-y-auto">
          <h2 className="font-bold mb-3 text-green-800 text-lg">View Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks</p>
          ) : (
            tasks.map(t => (
              <div key={t.id} className="border-b py-1 text-sm">
                <p className={t.completed ? 'line-through text-green-700' : ''}>
                  {t.title}
                </p>
              </div>
            ))
          )}
        </div>

        {/* UPDATE TASK */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg">
          <h2 className="font-bold mb-3 text-yellow-800 text-lg">Update Task</h2>

          <select
            value={editTask.id || ''}
            onChange={e => {
              const id = Number(e.target.value);
              const t = tasks.find(t => t.id === id);
              if (t) setEditTask({ id: t.id, title: t.title, description: t.description });
            }}
            className="w-full mb-2 p-2 border rounded-lg"
          >
            <option value="">Select Task</option>
            {tasks.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Title"
            value={editTask.title}
            onChange={e => setEditTask({ ...editTask, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Description"
            value={editTask.description}
            onChange={e => setEditTask({ ...editTask, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <button
            onClick={updateTask}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold"
          >
            Update
          </button>
        </div>

        {/* COMPLETE / DELETE */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-200 to-pink-300 shadow-lg max-h-[300px] overflow-y-auto">
          <h2 className="font-bold mb-3 text-red-700 text-lg">Complete / Delete</h2>

          {tasks.map(t => (
            <div key={t.id} className="flex flex-col gap-2 mb-2 text-sm">
              <span className={t.completed ? 'line-through text-green-700' : ''}>
                {t.title}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(t.id)}
                  className="flex-1 bg-green-500 text-white py-1 rounded-lg"
                >
                  {t.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded-lg"
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