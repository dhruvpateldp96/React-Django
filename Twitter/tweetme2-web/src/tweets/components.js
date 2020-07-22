import React,  {useEffect, useState}  from 'react'
import {apitweetCreate, apitweetAction, apitweetList} from '../lookup/lookup'

export function TweetComponent(props){
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])
  
  const handleBackendUpdate = (response, status) => {
    //backend api response handler
    let tempNewTweets = [...newTweets]
    console.log(response,status)
    if (status === 201){
      tempNewTweets.unshift(response)
      setNewTweets(tempNewTweets)
    } else {
      alert("An error has occured")
    }
  }

  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    console.log(newVal)
    //backend api request
    apitweetCreate(newVal, handleBackendUpdate) 
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

export function ParentTweet(props){
  const {tweet} = props

  return tweet.parent ? <div className='row'>
  <div className='col-11 mx-auto p-3 border rounded'>
    <p className='mb-0 text-muted small'> Retweet </p>
   <Tweet className={''} hideActions  tweet={tweet.parent} ></Tweet>
   </div>
   </div> : null
}

export function Tweet(props){
    const {tweet, didRetweet, hideActions} = props
    // const {tweet} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto'

    const handlePerformAction = (newActionTweet,status) => {
      if(status===200){
        setActionTweet(newActionTweet)
      }else if (status ===201){
          //let the tweelist know
          if (didRetweet){
            didRetweet(newActionTweet)
          }
      }

      }
      

    return <div className={className}>
      <div>
        <p>{tweet.id}-{tweet.content}</p>
        <ParentTweet tweet = {tweet}/>
      </div>
      
      {(actionTweet && hideActions !== true) &&<div className='btn btn-group'>
        <ActionBtn tweet={actionTweet} didPerformAction = {handlePerformAction} action= {{type:'like', display:"Likes"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction = {handlePerformAction} action= {{type:'unlike', display:"Unlike"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction = {handlePerformAction} action= {{type:'retweet', display:"Retweet"}}/>

      </div>
      }
    </div>
  }
  
  
  
export function ActionBtn(props){
    const {tweet, action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes :0
    // const [likes, setLikes] = useState(tweet.likes ? tweet.likes :0)
    // const [justClicked, setJustClicked] = useState(false)
    // const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false )

    const className=props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    // const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}` : `${actionDisplay}`
    const handleActionBackendEvent = (response, status) =>{
      console.log(response, status)
      if ((status === 200 || status === 201) && didPerformAction){

        didPerformAction(response,status)
      }

   }
    
    const handleClick = (event) => {
      event.preventDefault()
      apitweetAction(tweet.id, action.type, handleActionBackendEvent)
     
        
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
        const handleTweetListLookup= (response, status) => {
          // console.log("this nigger",response,status)
          if (status===200){
            // const finalTweetsInit = [...response].concat(tweetsInit)
            // setTweetsInit(finalTweetsInit)
            setTweetsInit(response)
            setTweetDidSet(true)
          }else{
            alert('there was an error')
          }
        }
        apitweetList(handleTweetListLookup)
      }
    }, [tweetsInit,tweetDidSet,setTweetDidSet])

    const handleDidRetweet = (newTweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)

        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(newTweet)
        setTweets(updateFinalTweets)
    }
  
    return tweets.map((item,index) => {
      return <Tweet 
      tweet = {item} 
      didRetweet = {handleDidRetweet}
      key={index} 
      className ='my-5 py-5 border bg-white text-dark'/>
    })
}
  
  
  