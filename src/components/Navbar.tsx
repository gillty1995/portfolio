"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Music", href: "#music" },
  { name: "Contact", href: "#contact" },
];

const menuVariants = {
  open: {
    clipPath: "circle(120% at 99% 4%)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  closed: {
    clipPath: "circle(0% at 98.5% 4%)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const hamburgerRect = hamburgerRef.current?.getBoundingClientRect();
      if (!hamburgerRect) return;
      const hamburgerCenterY = hamburgerRect.top + hamburgerRect.height / 2;
      const projectsSection = document.getElementById("projects");
      const skillsSection = document.getElementById("skills");
      const albumSection = document.getElementById("albums");
      const contactSection = document.getElementById("contact");
      const sections = [
        projectsSection,
        skillsSection,
        albumSection,
        contactSection,
      ].filter((section): section is HTMLElement => section !== null);
      let shouldBeDark = false;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (hamburgerCenterY >= rect.top && hamburgerCenterY <= rect.bottom) {
          shouldBeDark = true;
        }
      });
      setIsDark(shouldBeDark);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 z-50 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <button
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`text-2xl focus:outline-none absolute top-4 right-4 ${
            isDark ? "text-black" : "text-white"
          }`}
        >
          ☰
        </button>
      </div>

      <motion.div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
        style={{ backgroundColor: "rgba(17, 24, 39, 0.8)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ scale: 1.1 }}>
              <a
                href={link.href}
                className="text-white text-2xl"
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ fontFamily: "LexendZetta", fontWeight: 100 }}
              >
                {link.name}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
