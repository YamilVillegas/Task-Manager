import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import './App.css';
import { FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Work");
  const [darkMode, setDarkMode] = useState(false);

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

  const transitions = useTransition(tasks, {
    keys: task => task.id,
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`task-manager ${darkMode ? 'dark' : ''}`}>
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

      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {transitions((styles, task) => (
              <animated.li style={styles} key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {task.name}
                <button onClick={() => deleteTask(task.id)}>
                  <FaTrashAlt />
                </button>
              </animated.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskManager;