"use client";

import React, { useState } from "react";
import { API_BASE_URL } from "@/lib/api";

interface TranscriptLine {
  text: string;
  start: number;
  duration: number;
}

// Placeholder for a robust YouTube URL validation function
function isValidYouTubeUrl(url: string): boolean {
  // Accepts most YouTube video URLs
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url.trim());
}

export default function YouTubeUrlForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[] | null>(null);

  // Placeholder for rate limiting/cooldown logic
  // TODO: Implement rate limiting prevention (e.g., cooldown timer, backend check, etc.)
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTranscript(null);

    // Validate YouTube URL
    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    // Placeholder: Rate limiting check
    if (isRateLimited) {
      setError("You are submitting too quickly. Please wait before trying again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/transcript`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "An error occurred fetching the transcript.");
      } else {
        const data = await response.json();
        setTranscript(data.transcript as TranscriptLine[]);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center border border-gray-100"
      >
        <label
          htmlFor="youtube-url"
          className="mb-4 text-base font-medium text-gray-700 text-left w-full"
        >
          Insert a YouTube video URL
        </label>
        <div className="w-full flex flex-row gap-2">
          <input
            id="youtube-url"
            type="text"
            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50 placeholder-gray-400"
            placeholder="youtube.com/watch?v=XXXXXXXXXXX"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading || isRateLimited}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`rounded-lg px-6 py-3 text-base font-semibold bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-sm`}
            disabled={loading || isRateLimited}
          >
            {loading ? "Loading..." : "Convert"}
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600 text-sm w-full text-left">{error}</div>
        )}
        {/* Placeholder: Show a rate limiting reminder or cooldown timer here */}
        {isRateLimited && (
          <div className="mt-2 text-yellow-600 text-xs w-full text-left">
            Too many requests. Please wait before submitting again.
          </div>
        )}
        {transcript && (
          <div className="mt-6 w-full bg-gray-50 rounded-lg p-4 text-gray-800 text-sm whitespace-pre-line border border-gray-200">
            <strong>Transcript:</strong>
            <ul className="list-disc pl-5 mt-2">
              {transcript.map((line, idx) => (
                <li key={idx}>
                  {line.text}
                  {/* Optionally show timestamps: */}
                  {/* <span className="text-gray-400 ml-2">({line.start}s, {line.duration}s)</span> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
} 