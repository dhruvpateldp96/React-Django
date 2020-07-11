import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetching() {
    
    const [Post, setPost] = useState({})
    const [id, setId] = useState(1)
    const [idFromButtonClick, setIdFromButtonClick] = useState(1)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromButtonClick}`)
        .then(response => {console.log(response)
        setPost(response.data)})
            .catch(err => {console.log(err)})
        }, [idFromButtonClick])
    
    const handleClick = () => {
        setIdFromButtonClick(id)
    } 
    return (
        <div>
            <input type="text" value = {id} onChange = {(event) => setId(event.target.value)}/>   
            <button onClick = {handleClick}> Fetch data </button>
            <div>{Post.title}</div>
            {/* <ul>
                {
                    Post.map(post => <li key={post.id}> {post.title} </li>)
                }
            </ul> */}
        </div>
    )
}

export default DataFetching
