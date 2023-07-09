import { useLoaderData } from 'react-router-dom';
import React, { useState } from 'react';
import NoteForm from './NoteForm';


export async function loader({params}){
  const response = await fetch ("http://localhost:3000/todos/" + params.taskId);
  const todo = await response.json();
  return todo;
}


function NotePage() {
  const todo = useLoaderData();
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

  const taskNotes = notes.filter((note) => note.taskId === todo.id);

  return (
    <div>
      <h2>Task ID: {todo.id}</h2>
      <NoteForm taskId={todo.id} onSubmit={handleAddNote} />
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






