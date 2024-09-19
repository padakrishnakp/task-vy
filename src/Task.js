import React, { useState, useEffect } from 'react';
import './Task.css'; // Import the CSS file

const Task = () => {
  // Retrieve data from localStorage if it exists, otherwise fall back to the default data
  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      "Onboarding Call",
      "Google Search Console Access",
      "Google Analytics Access",
      "Website Access",
      "Technical Audit",
      "Anchor Text and Semantic Analysis",
      "Competitor Analysis",
      "Anchor Text/URL Mapping",
      "Google Data Studio Report + Local Reporting Suite",
      "Site Level Optimization",
      "On Page Optimization",
      "Content Creation",
      "Content Publishing",
      "Premium Press Release",
      "Authority Niche Placements",
      "Review Management",
      "Index Links",
      "Video Recap"
    ];
  };

  const [editableIndex, setEditableIndex] = useState(null);
  const [editedText, setEditedText] = useState(null);
  const [tasks, setTasks] = useState(getInitialTasks); // Load initial tasks from localStorage or default

  // Save updated tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCellClick = (index, text) => {
    setEditableIndex(index);
    setEditedText(text);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleInputBlur = () => {
    setEditableIndex(null); // Exit editable mode when clicking outside the input
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      // Update the task list with the new text
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedText;
      setTasks(updatedTasks);

      setEditableIndex(null); // Close editing mode when Enter is pressed
    }
  };

  // Handle the submit button click to log tasks
  const handleSubmit = () => {
    console.log("Current Tasks: ", tasks);
  };

  return (
    <div className="task-container">
      <h2 className="task-title">Task List</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Month</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((item, index) => (
              <tr key={index}>
                <td onClick={() => handleCellClick(index, item)}>
                  {editableIndex === index ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyPress={(e) => handleKeyPress(e, index)} // Detect Enter key press
                      autoFocus
                    />
                  ) : (
                    item
                  )}
                </td>
                <td></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* Add Submit button */}
      <button className="task-submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Task;
