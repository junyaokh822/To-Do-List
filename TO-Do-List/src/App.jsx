import React, { useState, useEffect } from 'react';
import './App.css';

function Form({ onAddTodo }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = async () => {
    if (input.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: input,
            completed: false,
          }),
        });

        if (response.ok) {
          const createdTodo = await response.json();
          onAddTodo(createdTodo);
          setInput('');
          window.location.reload(); 
        } else {
          console.error('Failed to create todo.');
        }
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const tasks = await response.json();
      setList(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        const createdTodo = await response.json();
        setList([...list, createdTodo]);
      } else {
        console.error('Failed to create todo.');
      }
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
      } else {
        console.error('Failed to delete todo.');
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const todoToUpdate = list.find((todo) => todo.id === id);
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        const newList = list.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return todo;
        });
        setList(newList);
      } else {
        console.error('Failed to update todo.');
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const completedTasks = list.filter((todo) => todo.completed);
  const incompleteTasks = list.filter((todo) => !todo.completed);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <Form onAddTodo={addTodo} />
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
