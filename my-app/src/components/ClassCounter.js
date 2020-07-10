import React, { Component } from 'react'

export class ClassCounter extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
    }

    incrementCounter = () => {
        this.setState((prevState)=>{
            return{
                count: this.state.count + 1
            }
            })
    }
    render() {
        return (
            <div>
                <button onClick = {this.incrementCounter}> Counter {this.state.count}</button>
            </div>
        )
    }
}

export default ClassCounter
