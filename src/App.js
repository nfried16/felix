import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './pages/Counter';
import Background from './felix/Background';

function App() {
  return (
    <div className="App">
      <Background />
      <Counter/>
    </div>
  );
}

export default App;
