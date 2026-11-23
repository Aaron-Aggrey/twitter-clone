import Link from "next/link";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetails({ params }) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <main>
      <Link href="/">← Back to Home</Link>

      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>

      <p>👍 {tweet.reactions.likes} Likes</p>
      <p>Tags: {tweet.tags.join(", ")}</p>
    </main>
  );
}