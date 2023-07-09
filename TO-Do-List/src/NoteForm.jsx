import React, { useState } from 'react';

function NoteForm({ taskId, onSubmit }) {
  const [note, setNote] = useState('');

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskId, note);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={note} onChange={handleInputChange} placeholder="Enter your note..." />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;

