export default function RightSidebar() {
  const trends = [
    "#NextJS",
    "#JavaScript",
    "#React",
    "#WebDevelopment",
    "#TailwindCSS",
  ];

  return (
    <aside className="hidden lg:block w-80 p-5 border-l border-gray-200">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6 rounded-2xl bg-gray-100 p-5">
        <h2 className="text-xl font-bold mb-5">
          What&apos;s happening?
        </h2>

        {trends.map((trend) => (
          <div key={trend} className="py-3 border-b border-gray-200">
            <p className="font-semibold">{trend}</p>
            <p className="text-sm text-gray-500">
              Trending in Technology
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}