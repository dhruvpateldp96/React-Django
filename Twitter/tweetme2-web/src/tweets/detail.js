import React, { useState } from 'react';
import { ActionBtn } from './buttons';

export function ParentTweet(props) {
  const { tweet } = props;
  return tweet.parent ? <div className='row'>
    <div className='col-11 mx-auto p-3 border rounded'>
      <p className='mb-0 text-muted small'> Retweet </p>
      <Tweet className={''} hideActions tweet={tweet.parent}></Tweet>
    </div>
  </div> : null;
}
export function Tweet(props) {
  // console.log("sex chade", props.tweet[0].content)
  const { tweet, didRetweet, hideActions } = props;
  // const {tweet} = props
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null);
  const className = props.className ? props.className : 'col-10 mx-auto';
  

  const path = window.location.pathname
  var match = path.match(/(?<tweetid>\d+)/)
  var urlTweetId = match ? match.groups.tweetid : -1
  const isDetail = `${tweet.id}` === `${urlTweetId}`
  

  if (match){

  }
  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    }
    else if (status === 201) {
      //let the tweelist know
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweet.id}`
  }
  return <div className={className}>
    <div>
      <p>{tweet.id}-{tweet.content}</p>
      <ParentTweet tweet={tweet} />
    </div>

    <div className='btn btn-group'>
    {(actionTweet && hideActions !== true) && <React.Fragment>
      <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', display: "Likes" }} />
      <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', display: "Unlike" }} />
      <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', display: "Retweet" }} />
      </React.Fragment>}
      {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick = {handleLink}> View</button>}
    </div>
  </div>;
}
