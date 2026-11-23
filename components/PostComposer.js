
"use client";

import { useState } from "react";

export default function PostComposer({ onAddTweet }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim() || submitting) return;

    try {
      setSubmitting(true);

      await onAddTweet(content.trim());

      setContent("");
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-b p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full resize-none outline-none text-lg"
        rows={3}
      />

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={!content.trim() || submitting}
          className="rounded-full bg-blue-500 px-6 py-2 text-white font-bold hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
