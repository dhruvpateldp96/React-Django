import React from 'react';
import './App.css';
import {TweetComponent} from './tweets'


function App() {
  
  return (
    <div className="App">
      <div className='App-header'>
        <h2> welcome to react </h2>
          <h1> 
              <TweetComponent />
          </h1>
      </div>
      
      
    </div>
  );
}

export default App;
