import React, {useState} from 'react'

function HookCounterTwo() {
    const initialCount = 0
    const [count,setCount] = useState(initialCount)
    return (
        <div>
            Count: {count}
            <button onClick = {()=>{setCount(initialCount)}}>Reset</button>
            <button onClick = {()=>{setCount((prevCount) => {return prevCount+1})}}>INCREMENT</button>
            <button onClick = {()=>{setCount((prevCount) => {return prevCount+1})}}>DECREMENT</button>
            <button onClick = {() => {setCount(prevState => prevState + 5 )}}>Inc 5</button>

        </div>
    )
}

export default HookCounterTwo
