import React, { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (todo) => { //adding new tasks to the list
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };
    setList([...list, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {   //delete the stored task from the list
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { // pressing enter triggers the addTodo function
      addTodo(input);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress} 
      />
      <button onClick={() => addTodo(input)}>Add</button>
      <ul>
        {list.map((todo) => (
          <li key={todo.id}>
            <span className="bullet">&bull;</span>
            <span>{todo.todo}</span>
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

