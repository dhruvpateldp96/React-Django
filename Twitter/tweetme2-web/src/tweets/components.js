import React,  {useEffect, useState}  from 'react'
import {loadTweets, createTweet} from '../lookup/index'

export function TweetComponent(props){
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    console.log(newVal)
    let tempNewTweets = [...newTweets]
    createTweet(newVal, (response,status) =>{
      if (status === 201){
        tempNewTweets.unshift(response)
      } else {
        alert("An error has occured")
      }
      
    })
  
    setNewTweets(tempNewTweets)
    textAreaRef.current.value = ""
  }


  return <div className = {props.className}>
    <div className = 'col-12 mb-3'>

    
      <form onSubmit={handleSubmit}>
        <textarea ref={textAreaRef} required={true} className='form-control'>

        </textarea>
        <button type = 'submit' className = 'btn brn-primary my-3' name='tweet'> Tweet </button>
      </form>
    </div>
    <TweetsList newTweets={newTweets}/>
  </div>
}



export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : 'btn btn-group'
    return <div className={className}>
      <p>{tweet.id}-{tweet.content}</p>
      <div className={className}>
        <ActionBtn tweet={tweet} action= {{type:'like', display:"Likes"}}/>
        <ActionBtn tweet={tweet} action= {{type:'unlike', display:"Unlike"}}/>
        <ActionBtn tweet={tweet} action= {{type:'retweet', display:"Retweet"}}/>

      </div>
    </div>
  }
  
  
  
export function ActionBtn(props){
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes :0)
    // const [justClicked, setJustClicked] = useState(false)
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false )

    const className=props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    // const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}` : `${actionDisplay}`
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like'){
        if (userLike === true){
          setLikes(likes - 1)
          setUserLike(false)
        }else{
          setLikes(likes + 1)
          setUserLike(true)
        }
        
      }
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}`: `${actionDisplay}`
    return <button className ={className} onClick={handleClick}>{display} </button> 
}





export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : [])
    const [tweets, setTweets] = useState([])
    const [tweetDidSet, setTweetDidSet] = useState(false)
    // console.log(props.newTweets)
    // setTweetsInit([...props.newTweets].concat(tweetsInit))

    useEffect(() => {
      const final = [...props.newTweets].concat(tweetsInit)
      if (final.length !== tweets.length){
        setTweets(final)
      }     
    }, [tweetsInit, tweets, props.newTweets])


    useEffect(() => {
      if (tweetDidSet === false){
        const myCallback= (response, status) => {
          console.log("this nigger",response,status)
          if (status===200){
            // const finalTweetsInit = [...response].concat(tweetsInit)
            // setTweetsInit(finalTweetsInit)
            setTweetsInit(response)
            setTweetDidSet(true)
          }else{
            alert('there was an error')
          }
        }
        loadTweets(myCallback)
      }
    }, [tweetsInit,tweetDidSet,setTweetDidSet])
  
    return tweets.map((item,index) => {
      return <Tweet tweet = {item} key={index} className ='my-5 py-5 border bg-white text-dark'/>
    })
}
  
  
  