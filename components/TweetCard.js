
"use client";

import { useState } from "react";
import Link from "next/link";

export default function TweetCard({ tweet }) {
  // Support both MongoDB and DummyJSON tweet formats
  const isMongoTweet = Boolean(tweet._id);

  const author = tweet.author || `User ${tweet.userId}`;
  const content = tweet.content || tweet.body || "";
  const title = tweet.title || "";
  const tags = tweet.tags || [];

  // MongoDB voting
  const [upvotes, setUpvotes] = useState(tweet.upvotes ?? 0);
  const [downvotes, setDownvotes] = useState(tweet.downvotes ?? 0);
  const [voting, setVoting] = useState(false);
  const [voteError, setVoteError] = useState("");

  // DummyJSON like functionality
  const [likes, setLikes] = useState(
    tweet.reactions?.likes ?? 0
  );
  const [liked, setLiked] = useState(false);

  // Comment functionality
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  // Save votes in MongoDB
  async function handleVote(type) {
    if (voting) return;

    try {
      setVoting(true);
      setVoteError("");

      const response = await fetch(`/api/tweets/${tweet._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      const updatedTweet = await response.json();

      if (!response.ok) {
        throw new Error(updatedTweet.error || "Voting failed");
      }

      // Update the displayed counts using database response
      setUpvotes(updatedTweet.upvotes);
      setDownvotes(updatedTweet.downvotes);

    } catch (error) {
      console.error("Voting error:", error);
      setVoteError("Could not save your vote. Please try again.");
    } finally {
      setVoting(false);
    }
  }

  // DummyJSON likes
  function handleLike() {
    if (liked) {
      setLikes((previousLikes) => previousLikes - 1);
      setLiked(false);
    } else {
      setLikes((previousLikes) => previousLikes + 1);
      setLiked(true);
    }
  }

  // Add comments
  function handleComment(e) {
    e.preventDefault();

    if (!commentInput.trim()) return;

    setComments((previousComments) => [
      ...previousComments,
      commentInput.trim(),
    ]);

    setCommentInput("");
  }

  return (
    <article className="border-b border-gray-200 p-5 hover:bg-gray-50 transition duration-200">

      {/* User information */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {author.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-bold">{author}</p>
          <p className="text-sm text-gray-500">
            @{author.toLowerCase().replace(/\s+/g, "")}
          </p>
        </div>
      </div>

      {/* Tweet title - only DummyJSON tweets open details */}
      {title && (
        <h2 className="text-lg font-bold mb-2">
          {typeof tweet.id === "number" ? (
            <Link
              href={`/tweet/${tweet.id}`}
              className="hover:text-blue-500"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
      )}

      {/* Tweet content */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-blue-500 text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Engagement statistics */}
      <div className="flex justify-between max-w-md text-sm text-gray-500">

        {isMongoTweet ? (
          <>
            <button
              type="button"
              onClick={() => handleVote("up")}
              disabled={voting}
              className="hover:text-green-600 disabled:opacity-50"
            >
              👍 {upvotes}
            </button>

            <button
              type="button"
              onClick={() => handleVote("down")}
              disabled={voting}
              className="hover:text-red-500 disabled:opacity-50"
            >
              👎 {downvotes}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleLike}
              className={liked ? "text-red-500" : "hover:text-red-500"}
            >
              ❤️ {likes}
            </button>

            <span>👎 {tweet.reactions?.dislikes ?? 0}</span>
            <span>👀 {tweet.views ?? 0}</span>
          </>
        )}

        <span>💬 {comments.length}</span>
      </div>

      {/* Voting error */}
      {voteError && (
        <p className="mt-2 text-sm text-red-500">
          {voteError}
        </p>
      )}

      {/* Comment form */}
      <div className="mt-5">
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 min-w-0 rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!commentInput.trim()}
            className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Reply
          </button>
        </form>

        {/* Display comments */}
        <div className="mt-4">
          <p className="font-semibold mb-2">
            Comments ({comments.length})
          </p>

          {comments.map((comment, index) => (
            <p
              key={index}
              className="border-b py-2 text-gray-700"
            >
              {comment}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
