import React, { useReducer } from 'react';
import './App.css';
// import IntervalClassCounter from './components/IntervalClassCounter';
// import IntervalHookCounter from './components/IntervalHookCounter';
// import DataFetching from './components/DataFetching'
// import CounterOne from './components/CounterOne'
// import CounterThree from './components/CounterThree'
// import ComponentA from './components/ComponentA'
// import ComponentB from './components/ComponentB'
// import ComponentC from './components/ComponentC'
// import DataFetchingTwo from './components/DataFetchingTwo'
// import FocusInput from './components/FocusInput'
// import HookTimer from './components/HookTimer'
import DocTitleOne from './components/DocTitleOne'
import DocTitleTwo from './components/DocTitleTwo'

// export const CountContext = React.createContext()

// const initialState = 0
// const reducer = (state, action) => {
//     switch(action) {
//         case 'increment':
//             return state+1
//         case 'decrement':
//             return state-1      <DocTitleOne />

//         case 'reset':
//             return initialState           
//         default:
//             return state 
//     }
// }



function App() {

  // const [count, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <DocTitleOne />
      <DocTitleTwo />

    </div>
    // <CountContext.Provider value={{ countState: count, countDispatch: dispatch }}>
    //   <div className="App">
    //     Count {count }
    //     <ComponentA/>
    //     <ComponentB/>
    //     <ComponentC/>
    //   {/* <CounterThree /> */}
    // </div>
    // </CountContext.Provider>

  );
}

export default App;
