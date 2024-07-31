// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import DrugDetail from './components/DrugDetail';
import './styles.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/drugs/:drugName" element={<DrugDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
