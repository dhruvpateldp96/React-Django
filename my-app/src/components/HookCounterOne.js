import React, {useState,useEffect} from 'react'

function HookCounterOne() {

    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        console.log('useffect - updating document title')
        document.title = `You clicked ${count} times`
        
    }, [count])

    return (
        <div>
            <input type = 'text' value ={name} onChange = {(event) => setName(event.target.value)}></input>
            <button onClick = {()=>{setCount((prevCount) => prevCount+1)}}> {count} </button>
        </div>
    )
}

export default HookCounterOne
