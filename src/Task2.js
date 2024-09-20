import React, { useState, useEffect, useRef } from 'react';
import { fetchNotes, addNote, deleteNote } from './apiService';
import './Task2.css';

const Task2 = () => {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await fetchNotes();
        setTasks(notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    getNotes();
  }, []);
  
  const handleAddNote = async () => {
    const newNote = inputRef.current.value;

    if (newNote.trim()) {
      const newTask = { message: newNote };

      try {
        const data = await addNote(newTask);
        setTasks([...tasks, data]);
        inputRef.current.value = '';
        setTempNote('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleInputChange = () => {
    const newNote = inputRef.current.value;
    setTempNote(newNote);
  };

  const handleDeleteNote = async (index, id) => {
    try {
      await deleteNote(id);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="task2-container">
      <h2 className="task2-title">Task Notes</h2>
      <div className="input-container">
        <input
          type="text"
          className="task2-input"
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Type your note here..."
        />
        <button className="task2-button" onClick={handleAddNote}>Add</button>
      </div>
      <div className="task2-grid">
        {tempNote && (
          <div className="task2-card">
            <div className="task2-note">{tempNote}</div>
            <div className="task2-date">{new Date().toLocaleDateString()}</div>
          </div>
        )}
        {Array.isArray(tasks) && tasks.map((task, index) => (
          <div className="task2-card" key={task._id}>
            <div className="task2-note">{task.message}</div>
            <div className="task2-date">{new Date(task.create_at).toLocaleDateString()}</div>
            <button className="task2-delete-button" onClick={() => handleDeleteNote(index, task._id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task2;
