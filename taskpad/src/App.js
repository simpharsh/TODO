import React, { useState, useEffect } from 'react';
import './index.css';
import Note from './components/Note';

// Helper for colors
const COLORS = [
  '#fff740', // Classic Yellow
  '#ffcccb', // Light Red
  '#d4f1f4', // Light Blue
  '#e2f0cb', // Light Green
  '#f0e68c', // Khaki
];

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('taskpad_notes');
    try {
      return saved ? JSON.parse(saved) : [{
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: '- [ ] First task\n- [x] Done task',
        color: '#fff740'
      }];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('taskpad_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      content: '', // Empty start
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, newContent) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content: newContent } : n));
  };

  const updateNoteDate = (id, newDate) => {
    setNotes(notes.map(n => n.id === id ? { ...n, date: newDate } : n));
  };

  const deleteNote = (id) => {
    if (window.confirm('Delete this note?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  return (
    <div className="app-board">
      <div className="board-container">
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onChangeDate={updateNoteDate}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <button className="add-note-fab" onClick={addNote} title="Add New Note">+</button>
    </div>
  );
}

export default App;
