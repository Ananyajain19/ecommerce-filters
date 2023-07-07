import React from "react";
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowFilter from './components/ShowFilter'
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <ShowFilter/>
      </Router>
    </div>
  );
}

export default App;

