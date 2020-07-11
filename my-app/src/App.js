import React, { Component } from 'react';
import './App.css';
import IntervalClassCounter from './components/IntervalClassCounter';
import IntervalHookCounter from './components/IntervalHookCounter';
import DataFetching from './components/DataFetching'
import CounterOne from './components/CounterOne'
import CounterThree from './components/CounterThree'
import ComponentA from './components/ComponentA'
import ComponentB from './components/ComponentB'
import ComponentC from './components/ComponentC'

function App() {
  return (
    <div className="App">
      <ComponentA/>
      <ComponentB/>
      <ComponentC/>
     {/* <CounterThree /> */}
    </div>
  );
}

export default App;
