import React, { useState, useEffect } from "react";

import {apiTweetList} from "./lookup";

import { Tweet } from "./detail";

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);
    // console.log(props.newTweets)
    // setTweetsInit([...props.newTweets].concat(tweetsInit)) - infinite loop
  
    useEffect(() => {
      console.log("useEffect for insert new tweets - run more then one time");
      const final = [...props.newTweets].concat(tweetsInit);
      if (final.length !== tweets.length) {
        setTweets(final);
      }
    }, [props.newTweets, tweets, tweetsInit]);
  
    useEffect(() => {
      if (tweetsDidSet === false) {
        // do my lookup
        const handleTweetListLookup = (response, status) => {
          // console.log(response, status)
          if (status === 200) {
            setTweetsInit(response);
            setTweetsDidSet(true);
          } else {
            alert("There was an error");
          }
        };
        // API Call
        apiTweetList(props.username, handleTweetListLookup);
      }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);
  
    const handleDidRetweet = (newTweet) => {
      const updateTweetsInit = [...tweetsInit]
      updateTweetsInit.unshift(newTweet)
      setTweetsInit(updateTweetsInit)
      const updateFinalTweets = [...tweets]
      updateFinalTweets.unshift(tweets)
      setTweets(updateFinalTweets)
    }
  
    return tweets.map((item, index) => {
      return (
        <Tweet
          tweet={item}
          didRetweet={handleDidRetweet}
          className="my-5 py-5 border bg-white text-dark"
          key={`${index}-{item.id}`}
        />
      );
    });
  }