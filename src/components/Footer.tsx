"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTiktok, FaFileAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto flex justify-center items-center px-4">
        <div
          id="social-icons"
          className="flex items-center justify-center space-x-6 transition-colors"
        >
          <a
            href="https://github.com/gillty1995"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-blue-600 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/gillty/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@igimgillty"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok profile"
            className="hover:text-blue-600 transition-colors"
          >
            <FaTiktok size={24} />
          </a>
          <Link
            href="/resume"
            aria-label="Resume"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFileAlt size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
