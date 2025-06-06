"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNav } from "./NavContext";
import { usePathname, useRouter } from "next/navigation";

const defaultNavLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
  { name: "Socials", href: "#footer" },
  { name: "Resume", href: "resume" },
  { name: "Music", href: "/musicskills" },
];

export default function Navbar() {
  const { isOpen, toggleMenu } = useNav();
  const [isDark, setIsDark] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isMusicPage = pathname.startsWith("/musicskills");

  const navLinks = isMusicPage
    ? [
        { name: "Home", href: "#hero" },
        { name: "Instruments", href: "#musicinstruments" },
        { name: "Albums", href: "#albums" },
        { name: "Socials", href: "#footer" },
      ]
    : defaultNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      const hamburgerRect = hamburgerRef.current?.getBoundingClientRect();
      if (!hamburgerRect) return;
      const hamburgerCenterY = hamburgerRect.top + hamburgerRect.height / 2;

      let sections: HTMLElement[] = [];
      if (isMusicPage) {
        const instrumentsSection = document.getElementById("musicinstruments");
        const albumsSection = document.getElementById("albums");
        const contactSection = document.getElementById("contact");
        sections = [instrumentsSection, albumsSection, contactSection].filter(
          (section): section is HTMLElement => section !== null
        );
      } else {
        const projectsSection = document.getElementById("projects");
        const skillsSection = document.getElementById("skills");
        const albumSection = document.getElementById("albums");
        const contactSection = document.getElementById("contact");
        sections = [
          projectsSection,
          skillsSection,
          albumSection,
          contactSection,
        ].filter((section): section is HTMLElement => section !== null);
      }

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
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMusicPage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      toggleMenu();
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      } else if (pathname !== "/") {
        // If not found and not on the homepage, navigate there.
        router.push(`/${href}`);
      }
      // Special handling for footer highlighting (if needed)
      if (targetId === "footer") {
        setTimeout(() => {
          const socialsEl = document.getElementById("social-icons");
          if (socialsEl) {
            socialsEl.classList.add("highlight-socials");
            setTimeout(
              () => socialsEl.classList.remove("highlight-socials"),
              2000
            );
          }
        }, 500);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 z-[1000] bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <button
          ref={hamburgerRef}
          onClick={toggleMenu}
          className={`text-2xl focus:outline-none absolute top-4 right-4 cursor-pointer ${
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
        variants={{
          open: {
            clipPath: "circle(120% at 99% 4%)",
            transition: { type: "spring", stiffness: 100, damping: 20 },
          },
          closed: {
            clipPath: "circle(0% at 98.5% 4%)",
            transition: { type: "spring", stiffness: 400, damping: 40 },
          },
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
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
            ) : (
              <motion.div key={link.name} whileHover={{ scale: 1.1 }}>
                <Link
                  href={link.href}
                  className="text-white text-2xl"
                  onClick={() => {
                    // If already on /musicskills, refresh to reload content if needed.
                    if (pathname === "/musicskills") {
                      router.refresh();
                    }
                    toggleMenu();
                  }}
                  style={{ fontFamily: "LexendZetta", fontWeight: 100 }}
                >
                  {link.name}
                </Link>
              </motion.div>
            )
          )}
          {/* Close Button */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <button
              onClick={toggleMenu}
              className="text-white text-2xl cursor-pointer"
              style={{ fontFamily: "LexendZetta", fontWeight: 100 }}
            >
              Close
            </button>
          </motion.div>
        </div>
      </motion.div>
    </nav>
  );
}
