import React from 'react';
import './App.css';
import IntervalClassCounter from './components/IntervalClassCounter';
import IntervalHookCounter from './components/IntervalHookCounter';
import DataFetching from './components/DataFetching'

function App() {
  return (
    <div className="App">
     <IntervalClassCounter />
     <IntervalHookCounter />
     <DataFetching />
    </div>
  );
}

export default App;
