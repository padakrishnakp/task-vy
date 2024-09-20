import React, { useState, useEffect, useRef } from 'react';
import './Task2.css'; // Import the CSS file

const Task2 = () => {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/notes');
        const data = await response.json();
        
        // Access the notes array from the response
        if (Array.isArray(data.notes)) {
          setTasks(data.notes); // Set tasks to the array of notes
        } else {
          console.error('Expected an array of notes, but got:', data.notes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    fetchNotes();
  }, []);
  

  const handleAddNote = async () => {
    const newNote = inputRef.current.value;

    if (newNote.trim()) {
      const newTask = { message: newNote };

      try {
        const response = await fetch('http://localhost:3000/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
        const data = await response.json();

        // Update state with the new note
        if (data && data.message) {
          setTasks([...tasks, data]);
          inputRef.current.value = '';
          setTempNote('');
        } else {
          console.error('Expected a note object, but got:', data);
        }
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
      await fetch(`http://localhost:3000/api/notes/${id}`, { method: 'DELETE' });
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
            <div className="task2-date">{new Date(task.create_at).toLocaleDateString()}</div>            <button className="task2-delete-button" onClick={() => handleDeleteNote(index, task._id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task2;
