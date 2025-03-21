"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTiktok, FaFileAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://github.com/gillty1995"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/gillty/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@igimgillty"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaTiktok size={24} />
          </a>
          <Link
            href="/resume"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFileAlt size={24} />
          </Link>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Gill Hermelin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
