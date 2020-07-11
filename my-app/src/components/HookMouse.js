import React, {useState, useEffect} from 'react'

function HookMouse() {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const logMousePosition = (event) => {
        console.log('useEffect called ')
        setX(event.ClientX)
        setY(event.ClientY)
    }

    useEffect(() => {
        console.log('useEffect called')
        window.addEventListener('mousemove', logMousePosition)
    }, [])

    return (
        <div>
            Hooks X - {x} Y -{y}

        </div>
    )
}

export default HookMouse
