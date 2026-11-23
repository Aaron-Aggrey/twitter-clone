
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import TweetFeed from "../components/TweetFeed";

async function getTweets() {
  const res = await fetch("http://localhost:3000/api/tweets", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tweets");
  }

  return res.json();
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
