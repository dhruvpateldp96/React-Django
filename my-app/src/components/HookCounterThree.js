import React, {useState} from 'react'

function HookCounterThree() {
    const [name, setName] = useState({
        firstName: "", 
        lastName: ""
    })

    return (
        <div>
            <form>
                <input type="text" onChange = {(event) => setName({ ...name, firstName: event.target.value})} value = {name.firstName}/>
                <input type="text" onChange = {(event) => setName({ ...name, lastName: event.target.value})} value = {name.lastName}/>
    <h2> Your First Name is {name.firstName}</h2>
    <h2> Your Last Name is {name.lastName}</h2>
            </form>
        </div>
    )
}

export default HookCounterThree
