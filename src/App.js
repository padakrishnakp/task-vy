import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Task from './Task';
import Task2 from './Task2';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/task">
            <button>Task List</button>
          </Link>
          <Link to="/task2">
            <button>Task Notes</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/task" element={<Task />} />
          <Route path="/task2" element={<Task2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
