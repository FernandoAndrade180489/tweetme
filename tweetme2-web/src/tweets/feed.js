import React, { useState, useEffect } from "react";

import {apiTweetFeed} from "./lookup";

import { Tweet } from "./detail";

export function FeedList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
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
            setNextUrl(response.next)
            setTweetsInit(response.results);
            setTweetsDidSet(true);
          } 
        };
        // API Call
        apiTweetFeed(handleTweetListLookup);
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

    const handleLoadNext = (event) => {
      event.preventDefault()
      if (nextUrl !== null) {
        const handleLoadNextResponse = (response, status) => {
          if (status === 200) {
            setNextUrl(response.next)
            const newTweets = [...tweets].concat(response.results)
            setTweetsInit(newTweets);
            setTweets(newTweets)
          } 
        }
        apiTweetFeed(handleLoadNextResponse, nextUrl)
      }
    }
  
    return <React.Fragment>{ tweets.map((item, index) => {
      return (
        <Tweet
          tweet={item}
          didRetweet={handleDidRetweet}
          className="my-5 py-5 border bg-white text-dark"
          key={`${index}-{item.id}`}
        />
      );
    })}
    { nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
    </React.Fragment>
  }