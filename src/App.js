import React from "react";
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowFilter from './components/ShowFilter'
import FilterDropdown from "./components/FilterDropdown";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Header/>
    
      </Router>
    </div>
  );
}

export default App;

