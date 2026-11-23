import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-8">
        Twitter Clone
      </h1>

      <nav className="flex flex-col gap-6">
        <Link href="/" className="text-lg font-semibold hover:text-blue-500">
          🏠 Home
        </Link>

        <Link href="#" className="text-lg font-semibold hover:text-blue-500">
          🔍 Explore
        </Link>

        <Link href="#" className="text-lg font-semibold hover:text-blue-500">
          🔔 Notifications
        </Link>

        <Link href="#" className="text-lg font-semibold hover:text-blue-500">
          ✉️ Messages
        </Link>

        <Link href="#" className="text-lg font-semibold hover:text-blue-500">
          🔖 Bookmarks
        </Link>

        <Link href="#" className="text-lg font-semibold hover:text-blue-500">
          👤 Profile
        </Link>
      </nav>

      <button className="mt-10 w-full rounded-full bg-blue-500 py-3 text-white font-bold hover:bg-blue-600">
        Post
      </button>
    </aside>
  );
}