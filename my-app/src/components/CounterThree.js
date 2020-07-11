import React, {useReducer} from 'react'

const initialState = {
    firstCounter: 0,
    secondCounter: 10
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return {...state, firstCounter: state.firstCounter + action.value }
        case 'decrement':
            return {...state, firstCounter: state.firstCounter - action.value }
        case 'increment2':
            return {...state, secondCounter: state.secondCounter + action.value }
        case 'decrement2':
            return {...state, secondCounter: state.secondCounter - action.value }
        case 'reset':
            return initialState          
        default:
            return state
    }
}

function CounterThree() {

    
    const [count, dispatch] = useReducer(reducer, initialState)
    const [countTwo, dispatchTwo] = useReducer(reducer, initialState)
 
    return (
        <div>   
            <div>
                <div>Count - {count.firstCounter}</div>
                <div>Count - {count.secondCounter}</div>

                <button onClick = {() => dispatch({type: 'decrement',value: 1 })}>Decrement</button>
                <button onClick = {() => dispatch({type: 'increment',value: 1 })}>Increment</button>
                <button onClick = {() => dispatch({type: 'decrement',value: 5 })}>Decrement 5</button>
                <button onClick = {() => dispatch({type: 'increment',value: 5 })}>Increment 5</button>
                
                <button onClick = {() => dispatch({type: 'decrement2',value: 1 })}>Decrement2</button>
                <button onClick = {() => dispatch({type: 'increment2',value: 1 })}>Increment2</button>
                <button onClick = {() => dispatch({type: 'decrement2',value: 5 })}>Decrement2 5</button>
                <button onClick = {() => dispatch({type: 'increment2',value: 5 })}>Increment2 5</button>
                <button onClick = {() => dispatch({type: 'reset'})}>Reset</button>

            </div>

            <div>
                <div>Count - {countTwo.firstCounter}</div>
                <div>Count - {countTwo.secondCounter}</div>

                <button onClick = {() => dispatchTwo({type: 'decrement',value: 1 })}>Decrement</button>
                <button onClick = {() => dispatchTwo({type: 'increment',value: 1 })}>Increment</button>
                <button onClick = {() => dispatchTwo({type: 'decrement',value: 5 })}>Decrement 5</button>
                <button onClick = {() => dispatchTwo({type: 'increment',value: 5 })}>Increment 5</button>
                
                <button onClick = {() => dispatchTwo({type: 'decrement2',value: 1 })}>Decrement2</button>
                <button onClick = {() => dispatchTwo({type: 'increment2',value: 1 })}>Increment2</button>
                <button onClick = {() => dispatchTwo({type: 'decrement2',value: 5 })}>Decrement2 5</button>
                <button onClick = {() => dispatchTwo({type: 'increment2',value: 5 })}>Increment2 5</button>
                <button onClick = {() => dispatchTwo({type: 'reset'})}>Reset</button>

            </div>
        </div> 
    )
}

export default CounterThree
