import React,  {useEffect, useState}  from 'react'
import {loadTweets} from '../lookup/index'


export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : 'btn btn-group'
    return <div className={className}>
      <p>{tweet.id}-{tweet.content}</p>
      <div className={className}>
        <ActionBtn tweet={tweet} action= {{type:'like', display:"Likes"}}/>
        <ActionBtn tweet={tweet} action= {{type:'unlike', display:"Unlike"}}/>
        <ActionBtn tweet={tweet} action= {{type:'unlike', display:"Retweet"}}/>

      </div>
    </div>
  }
  
  
  
export function ActionBtn(props){
    const {tweet, action} = props
    const className=props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    // const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}` : `${actionDisplay}`
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like'){
        console.log(tweet.likes+1)
      }
    }
    return <button className ={className} onClick={handleClick}>{tweet.likes} {actionDisplay} </button> 
}





export function TweetsList(props) {
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
  
    return tweets.map((item,index) => {
      return <Tweet tweet = {item} key={index} className ='my-5 py-5 border bg-white text-dark'/>
    })
}
  
  
  