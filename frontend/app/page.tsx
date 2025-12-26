// 'use client';

// import { useState, useEffect } from 'react';
// import { Task, api } from '@/lib/api';
// import AuthComponent from '@/components/AuthComponent';

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [newTask, setNewTask] = useState({ title: '', description: '' });
//   const [userId, setUserId] = useState<string>('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Load tasks when userId is set
//   useEffect(() => {
//     if (userId) {
//       loadTasks();
//     } else {
//       setTasks([]);
//     }
//   }, [userId]);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       const tasksData = await api.getTasks(userId);
//       setTasks(tasksData);
//     } catch (error) {
//       console.error('Error loading tasks:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newTask.title.trim()) return;

//     try {
//       const createdTask = await api.createTask(userId, {
//         title: newTask.title,
//         description: newTask.description
//       });
//       setTasks([createdTask, ...tasks]);
//       setNewTask({ title: '', description: '' });
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   const toggleTaskCompletion = async (taskId: number) => {
//     try {
//       const updatedTask = await api.toggleTaskCompletion(userId, taskId);
//       setTasks(tasks.map(task =>
//         task.id === taskId ? updatedTask : task
//       ));
//     } catch (error) {
//       console.error('Error toggling task:', error);
//     }
//   };

//   const deleteTask = async (taskId: number) => {
//     try {
//       await api.deleteTask(userId, taskId);
//       setTasks(tasks.filter(task => task.id !== taskId));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const handleLogin = (userId: string) => {
//     setUserId(userId);
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setUserId('');
//     setIsAuthenticated(false);
//     setTasks([]);
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6 text-purple-700">✨ Todo App</h1>
//         <div className="max-w-md mx-auto">
//           <AuthComponent
//             onLogin={handleLogin}
//             onLogout={handleLogout}
//             isAuthenticated={isAuthenticated}
//             userId={userId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="container mx-auto p-4 text-purple-700">Loading tasks...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-purple-700">✨ Todo App</h1>
//         <AuthComponent
//           onLogin={handleLogin}
//           onLogout={handleLogout}
//           isAuthenticated={isAuthenticated}
//           userId={userId}
//         />
//       </div>

//       <form
//         onSubmit={handleCreateTask}
//         className="mb-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg transition-all hover:shadow-2xl"
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-purple-800">Create New Task</h2>
//         <div className="mb-4 space-y-3">
//           <input
//             type="text"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             placeholder="Task title"
//             className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
//             required
//           />
//           <textarea
//             value={newTask.description}
//             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//             placeholder="Task description (optional)"
//             className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
//             rows={3}
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transform transition"
//         >
//           Add Task
//         </button>
//       </form>

//       <div className="mb-4 flex space-x-3">
//         <button className="px-4 py-1 bg-gradient-to-r from-purple-300 to-purple-100 rounded-full hover:scale-105 transition">All</button>
//         <button className="px-4 py-1 bg-gradient-to-r from-green-300 to-green-100 rounded-full hover:scale-105 transition">Pending</button>
//         <button className="px-4 py-1 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full hover:scale-105 transition">Completed</button>
//       </div>

//       <div className="space-y-5">
//         {tasks.length === 0 ? (
//           <p className="text-lg text-gray-600">No tasks yet. Create your first task above!</p>
//         ) : (
//           tasks.map(task => (
//             <div
//               key={task.id}
//               className={`p-5 rounded-2xl shadow-lg flex justify-between items-center transition transform hover:scale-105 ${
//                 task.completed ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'
//               }`}
//             >
//               <div>
//                 <h3 className={`text-xl font-medium ${task.completed ? 'line-through text-green-700' : 'text-gray-800'}`}>
//                   {task.title}
//                 </h3>
//                 {task.description && (
//                   <p className="text-gray-600 mt-1">{task.description}</p>
//                 )}
//                 <p className="text-sm text-gray-400 mt-2">
//                   Created: {new Date(task.created_at).toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => toggleTaskCompletion(task.id)}
//                   className={`px-4 py-1 rounded-lg font-semibold transition transform hover:scale-105 ${
//                     task.completed
//                       ? 'bg-yellow-500 text-white'
//                       : 'bg-green-500 text-white'
//                   }`}
//                 >
//                   {task.completed ? 'Undo' : 'Complete'}
//                 </button>
//                 <button
//                   onClick={() => deleteTask(task.id)}
//                   className="px-4 py-1 bg-red-500 text-white rounded-lg font-semibold hover:scale-105 transform transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }













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
