"use client";

import React, { useState } from "react";

// Placeholder for a robust YouTube URL validation function
function isValidYouTubeUrl(url: string): boolean {
  // TODO: Implement a more robust validation
  return /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.{11}$/.test(url) ||
         /^https?:\/\/youtu\.be\/.{11}$/.test(url);
}

export default function YouTubeUrlForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Placeholder for rate limiting/cooldown logic
  // TODO: Implement rate limiting prevention (e.g., cooldown timer, backend check, etc.)
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate YouTube URL
    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    // Placeholder: Rate limiting check
    // if (isRateLimited) {
    //   setError("You are submitting too quickly. Please wait before trying again.");
    //   return;
    // }

    setLoading(true);

    // Placeholder: API call to fetch transcript would go here

    setTimeout(() => {
      setLoading(false);
      // setIsRateLimited(true); // Uncomment to simulate rate limiting
    }, 1500);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center"
      >
        <label
          htmlFor="youtube-url"
          className="mb-4 text-lg font-medium text-gray-700"
        >
          Insert a YouTube video URL
        </label>
        <div className="w-full flex flex-row gap-2">
          <input
            id="youtube-url"
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="youtube.com/watch?v=XXXXXXXXXXX"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading || isRateLimited}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`rounded-lg px-6 py-3 text-lg font-semibold bg-black text-white transition hover:bg-gray-800 disabled:opacity-50`}
            disabled={loading || isRateLimited}
          >
            {loading ? "Loading..." : "Convert"}
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        )}
        {/* Placeholder: Show a rate limiting reminder or cooldown timer here */}
        {isRateLimited && (
          <div className="mt-2 text-yellow-600 text-xs">
            Too many requests. Please wait before submitting again.
          </div>
        )}
      </form>
    </div>
  );
} 