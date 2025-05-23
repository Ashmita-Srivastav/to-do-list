import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('');
  const [sortValue, setSortedValue] = useState('');
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };
  const sortChange = (event) => {
    setSortedValue(event.target.value);
    //console.log('Selected:', event.target.value);
  };
  const priorityChange = (event) => {
    setPriority(event.target.value);
    //console.log('Selected:', event.target.value);
  };
  const addEvent = (event) => {
    event.preventDefault();
    if(!inputValue) return;
    const newTask = {
      text: inputValue,
      priority: priority || "Medium",
      completed: false
    };
    //console.log(inputValue);
    setTask([...task, newTask]);
    setInputValue('');
    setPriority('');
  };
  const toggleTask = (index) => {
    const updatesTask = [...task];
    updatesTask[index].completed = !updatesTask[index].completed;
    setTask(updatesTask);
  };
  const filteredTask = task.filter((t) => {
    if(filter === 'completed') return t.completed;
    if(filter === 'pending') return !t.completed;
    return true;
  });
  const sortedTask = [...filteredTask].sort((a, b) => {
  const priorities = { High: 3, Medium: 2, Low: 1 };
  if (sortValue === 'HtL') return priorities[b.priority] - priorities[a.priority];
  if (sortValue === 'LtH') return priorities[a.priority] - priorities[b.priority];
  return 0;
  });
  const deleteTask = (index) => {
    const updated = [...task];
    updated.splice(index, 1);
    setTask(updated);
  };
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(task[index].text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index) => {
    const updated = [...task];
    updated[index].text = editValue;
    setTask(updated);
    setEditIndex(null);
    setEditValue('');
  };


  return (
      <div className='box'>
      <h1>Planner</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
        {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
      </button>
      <input className='inp' value={inputValue} onChange={inputChange} placeholder='Enter your task' />
      <button className='add' onClick={addEvent}>➕</button>
      <select id='options' value={priority} onChange={priorityChange}>
        <option value="">Preference</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select id='sort' value={sortValue} onChange={sortChange}>
        <option value="">Sort by</option>
        <option value="HtL">High to Low</option>
        <option value="LtH">Low to High</option>
      </select>
      <button className='all' onClick={() => setFilter('all')}>All</button>
      <div className='done'><button onClick={() => setFilter('completed')}>Completed</button></div>
      <button className='pending' onClick={() => setFilter('pending')}>Pending</button>
      <div className='task-list'>
        {sortedTask.map((task, index) => (
          <div key={index}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} />
            {editIndex === index ? (
              <>
                <input value={editValue} onChange={handleEditChange} />
                <button className='tick' onClick={() => saveEdit(index)}>✅</button>
              </>
            ) : (
              <>
                <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text} ({task.priority})
                </span>
                <div className="task-buttons">
                  <button onClick={() => startEditing(index)}>✏️</button>
                  <button onClick={() => deleteTask(index)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      </div>
  );
}

export default App
