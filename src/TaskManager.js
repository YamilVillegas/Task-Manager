import React, { useState } from 'react';
import './App.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Work");

  const categories = ["Work", "Personal", "School", "Other"];

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { 
          id: Date.now(),
          name: newTask,
          category: selectedCategory,
          completed: false
        }
      ]);
      setNewTask("");
      setSelectedCategory("Work");
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getFilteredTasks = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        
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

      {/* Render tasks by category */}
      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {getFilteredTasks(category).map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {task.name}
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