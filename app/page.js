
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import TweetFeed from "../components/TweetFeed";
import { makeSureDbIsReady } from "../lib/db";
import { Tweet } from "../models/Tweet";

async function getTweets() {
  try {
    // Connect to MongoDB
    await makeSureDbIsReady();

    // Retrieve tweets, newest first
    const tweets = await Tweet.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Convert MongoDB values into client-friendly data
    return tweets.map((tweet) => ({
      ...tweet,
      _id: tweet._id.toString(),
      createdAt: tweet.createdAt?.toISOString() ?? null,
      updatedAt: tweet.updatedAt?.toISOString() ?? null,
    }));
  } catch (error) {
    console.error("Error fetching tweets from MongoDB:", error);
    throw new Error("Unable to load tweets. Please try again later.");
  }
}

export default async function HomePage() {
  const tweets = await getTweets();

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-500">
          Latest Tweets
        </h1>

        <TweetFeed initialTweets={tweets} />
      </main>

      <RightSidebar />
    </div>
  );
}
