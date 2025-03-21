"use client";
import Link from "next/link";

export default function Resume() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 space-y-8">
      <h1 className="text-gray-400 text-4xl font-bold">My Resume</h1>
      <p className="text-gray-700 text-center">
        Click the button below to view or download my resume.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/files/resume.pdf"
          target="_blank"
          className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-400 transition-colors duration-300 ease-in-out"
        >
          View Resume
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-400 transition-colors duration-300 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
