import React, { useState } from 'react';
import './Task2.css'; // Import the CSS file

const Task2 = () => {
  const [tasks, setTasks] = useState([
    { notes: "Hey, I just wanted to let you know that the meeting has been rescheduled to 3 PM tomorrow.", dated: "12-10-2023" },
    { notes: "Don’t forget to review the document I sent you earlier today", dated: "12-9-2024" },
    { notes: "Can you help me with the new design for the homepage? I need some feedback.", dated: "10-9-2024" }
  ]);
  
  const [newNote, setNewNote] = useState("");
  const [tempNote, setTempNote] = useState(""); // Temporary note for preview

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newTask = {
        notes: newNote,
        dated: new Date().toLocaleDateString()
      };
      setTasks([...tasks, newTask]);
      setNewNote(""); // Clear the input field after adding
      setTempNote(""); // Clear the temporary note
    }
  };

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
    setTempNote(e.target.value); // Update the temporary note
  };

  const handleDeleteNote = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="task2-container">
      <h2 className="task2-title">Task Notes</h2>
      <div className="input-container">
        <input
          type="text"
          className="task2-input"
          value={newNote}
          onChange={handleInputChange}
          placeholder="Type your note here..."
        />
        <button className="task2-button" onClick={handleAddNote}>Add</button>
      </div>
      <div className="task2-grid">
        {/* Display the temporary note as a new card */}
        {tempNote && (
          <div className="task2-card">
            <div className="task2-note">{tempNote}</div>
            <div className="task2-date">{new Date().toLocaleDateString()}</div>
          </div>
        )}
        {tasks.map((task, index) => (
          <div className="task2-card" key={index}>
            <div className="task2-note">{task.notes}</div>
            <div className="task2-date">{task.dated}</div>
            <button className="task2-delete-button" onClick={() => handleDeleteNote(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task2;
