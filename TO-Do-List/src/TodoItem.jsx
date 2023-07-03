import React, { useState } from 'react';

function TodoItem({ todo, deleteTodo, toggleCompletion, handleEdit, handleTaskEdit, editTask }) {
  const [editInput, setEditInput] = useState(todo.todo);

  const handleInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleTaskUpdate = (e) => {
    e.preventDefault();
    handleTaskEdit(todo.id, editInput);
    handleEdit(null);
  };  

  const handleOpenEditModal = () => {
    handleEdit(todo.id);
  };

  return (
    <li>
      <span className="bullet">&bull;</span>
      {editTask === todo.id ? (
        <div className="edit-modal">
          <input type="text" value={editInput} onChange={handleInputChange} />
          <button onClick={handleTaskUpdate}>Save</button>
        </div>
      ) : (
        <>
          <span className={`task ${todo.completed ? 'completed' : ''}`}>{todo.todo}</span>
          <button className="edit-button" onClick={handleOpenEditModal}>
            Edit
          </button>
        </>
      )}
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
