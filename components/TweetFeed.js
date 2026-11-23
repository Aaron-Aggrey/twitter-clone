
"use client";

import { useState } from "react";
import TweetCard from "./TweetCard";
import PostComposer from "./PostComposer";

export default function TweetFeed({ initialTweets = [] }) {
  const [tweets, setTweets] = useState(initialTweets);

  async function addTweet(content) {
    try {
      // Send the new tweet to our MongoDB API
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          author: "Aaron",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tweet");
      }

      // Get the created tweet from MongoDB
      const data = await response.json();

      // Add the new tweet to the beginning of the feed
      setTweets((previousTweets) => [
        data,
        ...previousTweets,
      ]);

    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  }

  return (
    <div>
      <PostComposer onAddTweet={addTweet} />

      {tweets.map((tweet) => (
        <div key={tweet._id || tweet.id}>
          <TweetCard tweet={tweet} />
        </div>
      ))}
    </div>
  );
}
