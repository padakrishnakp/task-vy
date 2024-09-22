import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import './App.css';
import Task from './Task';
import Task2 from './Task2';
import Task3 from './Task3';

function App() {
  const location = useLocation();

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-50%)' },
  });

  return (
    <div className="App">
      <nav>
        <Link to="/task">
          <button>Task List</button>
        </Link>
        <Link to="/task2">
          <button>Task Notes</button>
        </Link>
        <Link to="/task3">
          <button>Task Three</button>
        </Link>
      </nav>
      {transitions((style, item) => (
        <animated.div style={style}>
          <Routes location={item}>
            <Route path="/task" element={<Task />} />
            <Route path="/task2" element={<Task2 />} />
            <Route path="/task3" element={<Task3 />} />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
