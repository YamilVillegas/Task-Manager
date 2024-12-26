import React, { useState } from 'react';
import './App.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Work');
  const categories = ['Work', 'Personal', 'School', 'Other'];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          name: newTask,
          completed: false,
          category: selectedCategory
        }
      ]);
      setNewTask('');
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getFilteredTasks = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  return (
    <div className="task-manager">
      <h1 style={{color: '#ffffff'}}>Task Manager</h1>
      
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        
        <div className="task-controls">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="category-section">
          <h3 style={{color: '#ffffff'}}>{category}</h3>
          <ul style={{color: 'black'}}>
            {getFilteredTasks(category).map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span className="task-name">{task.name}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskManager;