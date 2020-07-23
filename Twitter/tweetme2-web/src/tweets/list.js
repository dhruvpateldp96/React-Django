import React, { useEffect, useState } from 'react';
import { apitweetList } from './lookup';
import { Tweet } from "./detail";
export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
  const [tweets, setTweets] = useState([]);
  const [tweetDidSet, setTweetDidSet] = useState(false);
  // console.log(props.newTweets)
  // setTweetsInit([...props.newTweets].concat(tweetsInit))
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [tweetsInit, tweets, props.newTweets]);
  useEffect(() => {
    if (tweetDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        // console.log("this nigger",response,status)
        if (status === 200) {
          // const finalTweetsInit = [...response].concat(tweetsInit)
          // setTweetsInit(finalTweetsInit)
          setTweetsInit(response);
          setTweetDidSet(true);
        }
        else {
          alert('there was an error');
        }
      };
      apitweetList(props.username, handleTweetListLookup);
    }
  }, [tweetsInit, tweetDidSet, setTweetDidSet, props.username]);
  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit];
    updateTweetsInit.unshift(newTweet);
    setTweetsInit(updateTweetsInit);
    const updateFinalTweets = [...tweets];
    updateFinalTweets.unshift(newTweet);
    setTweets(updateFinalTweets);
  };
  return tweets.map((item, index) => {
    return <Tweet tweet={item} didRetweet={handleDidRetweet} key={index} className='my-5 py-5 border bg-white text-dark' />;
  });
}
