import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import NasaPhoto from './components/NasaPhoto.jsx';
import './App.css';
import LanguageSwitcher from './components/LanguageSwitcher'; // ←作った場所に合わせて調整

function App() {
  const [count, setCount] = useState(0);
  const basePath = import.meta.env.VITE_BASE_PATH || "/";
  return (
    // <BrowserRouter>
    
    <BrowserRouter basename={basePath}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nasa-photo" element={<NasaPhoto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
