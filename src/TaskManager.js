import React, { useState } from 'react';

function TaskManager() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State to hold the new task name
  const [newTask, setNewTask] = useState("");
  
  // State to hold selected category
  const [selectedCategory, setSelectedCategory] = useState("Work");

  // Categories options
  const categories = ["Work", "Personal", "School", "Other"];

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks, 
        { 
          id: Date.now(), 
          name: newTask, 
          category: selectedCategory 
        }
      ]);
      setNewTask("");  // Reset the input field
      setSelectedCategory("Work"); // Reset category selection
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to filter tasks by category
  const getFilteredTasks = (category) => {
    return tasks.filter(task => task.category === category);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      {/* Input field for new task */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      
      {/* Dropdown for category selection */}
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <button onClick={addTask}>Add Task</button>

      {/* Render tasks by category */}
      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {getFilteredTasks(category).map((task) => (
              <li key={task.id}>
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