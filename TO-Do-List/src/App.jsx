import React, { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([
    {
      id: 1,
      todo: 'Prepare lunch for work',
      completed: false,
    },
    {
      id: 2,
      todo: 'Work out',
      completed: true,
    },
    {
      id: 3,
      todo: 'Take a break',
      completed: false,
    },
  ]);
  const [input, setInput] = useState('');

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
      completed: false,
    };
    setList([...list, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const toggleCompletion = (id) => {
    const newList = list.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setList(newList);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(input);
    }
  };

  const completedTasks = list.filter((todo) => todo.completed);
  const incompleteTasks = list.filter((todo) => !todo.completed);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => addTodo(input)}>Add</button>
      </div>
      <div className="task-container">
        <div className="task-column">
          <h2>Incomplete Tasks</h2>
          <ul className="task-list">
            {incompleteTasks.map((todo) => (
              <li key={todo.id}>
                <span className="bullet">&bull;</span>
                <span className="task">{todo.todo}</span>
                <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                  &times;
                </button>
                <button className="complete-button" onClick={() => toggleCompletion(todo.id)}>
                  Complete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="task-column">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {completedTasks.map((todo) => (
              <li key={todo.id}>
                <span className="bullet">&bull;</span>
                <span className={`task ${todo.completed ? 'completed' : ''}`}>{todo.todo}</span>
                <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                  &times;
                </button>
                <button className="complete-button" onClick={() => toggleCompletion(todo.id)}>
                  Incomplete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

