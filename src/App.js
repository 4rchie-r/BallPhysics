import React from 'react';
import BallSketch from './components/BallSketch';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Portfolio</h1>
      <BallSketch />
      <div>
        <a href="https://github.com/4rchie-r" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
            alt="GitHub" 
            style={{ width: '48px', height: '48px' }}  // Adjust size here
          />
        </a>
        <a href="https://www.linkedin.com/in/archie-reader-40137b1ab/" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://th.bing.com/th/id/OIP.Cn9SAHCmTy8MEaixr8bqpAHaHa?rs=1&pid=ImgDetMain" 
            alt="LinkedIn" 
            style={{ width: '48px', height: '48px' }}  // Adjust size here
          />
        </a>
      </div>
    </div>
  );
}

export default App;