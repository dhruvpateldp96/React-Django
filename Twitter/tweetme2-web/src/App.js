import React, {useEffect, useState} from 'react';
import './App.css';




function loadTweets(callback){

  const xhr = new XMLHttpRequest()
  const method = 'GET' 
  const url = 'http://localhost:8000/api/tweets'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method,url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = (event) => {
    console.log(event)
    callback({'message':"request was an error"},400)
  }
  xhr.send()

}



function Tweet(props){
  const {tweet} = props
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return <div className={className}>
    <p>{tweet.id}-{tweet.content}</p>
    <div className='btn btn-group'>
      <ActionBtn tweet={tweet} action= {{type:'like'}}/>
      <ActionBtn tweet={tweet} action= {{type:'unlike'}}/>
    </div>
  </div>
}



function ActionBtn(props){
  const {tweet, action} = props
  const className=props.className ? props.className : 'col-10 mx-auto col-md-6'
  return action.type === 'like' ? <button className ='btn btn-primary btn-sm'> {tweet.likes} Like </button> : null
}





function App() {

  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const myCallback= (response, status) => {
      console.log("this nigger",response,status)
      if (status===200){
        setTweets(response)
      }else{
        alert('there was an error')
      }
    }
    loadTweets(myCallback)

  }, [])



  return (
    <div className="App">
      <div className='App-header'>
        <h2> welcome to react </h2>
      
          <h1> {tweets.map((item,index) => {
          return <Tweet tweet = {item} key={index} className ='my-5 py-5 border bg-white text-dark'/>
        })}
        </h1>
      </div>
      
      
    </div>
  );
}

export default App;
