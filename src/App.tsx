// src/App.tsx
import React from 'react';
import {Route, Routes } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import Todo from './components/Todo/Todo';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<Homepage />}/>
         <Route path="/todos" element={<Todo />}/>
      </Routes>
    </div>
  );
};

export default App;
