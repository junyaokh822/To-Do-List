import React from 'react';

function TodoItem({ todo, deleteTodo, toggleCompletion }) {
  return (
    <li>
      <span className="bullet">&bull;</span>
      <span className={`task ${todo.completed ? 'completed' : ''}`}>{todo.todo}</span>
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
        &times;
      </button>
      <button className="complete-button" onClick={() => toggleCompletion(todo.id)}>
        {todo.completed ? 'Incomplete' : 'Complete'}
      </button>
    </li>
  );
}

export default TodoItem;
