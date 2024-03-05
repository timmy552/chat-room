import React, { useState, useEffect } from 'react';
import TextToSpeech from './text-to-speech';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinRoom from './joinRoom';

import './App.css';



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element= {<TextToSpeech />} />
      <Route path='/chat' element= {<JoinRoom />} />
      </Routes>
      </BrowserRouter>
     
   
    </div>
  );
}

export default App;
