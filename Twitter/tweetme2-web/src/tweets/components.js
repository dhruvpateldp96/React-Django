import React, {useEffect, useState}  from 'react'

import {TweetCreate} from './create'
import {TweetsList} from './list'
import {apitweetDetail} from './lookup'
import {Tweet} from './detail'

export function TweetComponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) =>{
      let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)
      setNewTweets(tempNewTweets)
    }
    return <div className={props.className}>
            {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
          <TweetsList newTweets={newTweets} {...props} />
    </div>
}


export function TweetDetailComponent(props){
  const {tweetId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [tweet, setTweet] = useState(null)
  // console.log("yolo",props,tweetId)

  const handleBackendLookup = (response, status) => {
    console.log(response)
    if (status === 200){
      setTweet(response)
    }else{
      alert("there was an error finding your tweet")
    }
  }

  useEffect(() => {
    if (didLookup === false){
      apitweetDetail(tweetId, handleBackendLookup)
      setDidLookup(true)
      
    }

  }, [tweetId,didLookup, setDidLookup])
  // console.log(tweet)

  
  return tweet === null ? null : tweet.map((item, index) => {
    return <Tweet 
    tweet={item}
     key={`${index}-{item.id}`} 
     className='my-5 py-5 border bg-white text-dark' />;
  })



  // return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}