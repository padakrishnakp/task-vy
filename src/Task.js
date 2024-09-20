import React, { useState, useEffect } from 'react';
import './Task.css'; 

const Task = () => {
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
  const [tasks, setTasks] = useState(getInitialTasks); 

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
    setEditableIndex(null); 
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedText;
      setTasks(updatedTasks);

      setEditableIndex(null); 
    }
  };

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
                      onKeyPress={(e) => handleKeyPress(e, index)} 
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
      <button style={{cursor:'pointer'}} className="task-submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Task;
