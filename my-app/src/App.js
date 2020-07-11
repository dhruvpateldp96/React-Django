import React from 'react';
import './App.css';
import IntervalClassCounter from './components/IntervalClassCounter';
import IntervalHookCounter from './components/IntervalHookCounter';
import DataFetching from './components/DataFetching'
import CounterOne from './components/CounterOne'
import CounterTwo from './components/CounterTwo'

function App() {
  return (
    <div className="App">
     {/* <IntervalClassCounter />
     <IntervalHookCounter />
     <DataFetching />
     <CounterOne/> */}
     <CounterTwo />
    </div>
  );
}

export default App;
