import React, { useState } from 'react';
import NoteForm from './NoteForm';

function NotePage({ match }) {
  const { id } = match.params;
  const [notes, setNotes] = useState([]);

  const handleAddNote = (taskId, note) => {
    const newNote = {
      taskId,
      note,
    };
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const taskNotes = notes.filter((note) => note.taskId === id);

  return (
    <div>
      <h2>Task ID: {id}</h2>
      <NoteForm taskId={id} onSubmit={handleAddNote} />
      <ul>
        {taskNotes.map((note, index) => (
          <li key={index}>
            <p>{note.note}</p>
            <button onClick={() => handleDeleteNote(index)}>Delete Note</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotePage;
