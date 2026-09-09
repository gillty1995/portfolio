"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNav } from "./NavContext";
import { usePathname, useRouter } from "next/navigation";
import {
  PORTFOLIO_NAVIGATION_EVENT,
  type PortfolioNavigationDetail,
} from "@/utils/navigationEvents";

const defaultNavLinks = [
  { name: "Home", href: "#hero" },
  { name: "My Work", href: "#featured-work" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
  { name: "Socials", href: "#footer" },
  { name: "Resume", href: "resume" },
  { name: "Music", href: "/musicskills" },
];

export default function Navbar() {
  const { isOpen, toggleMenu } = useNav();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const socialsObserverRef = useRef<IntersectionObserver | null>(null);
  const socialsAnimationTimerRef = useRef<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isMusicPage = pathname.startsWith("/musicskills");
  const [isDark, setIsDark] = useState(true);
  const shouldReduceMotion = useReducedMotion();

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
        const musicHeroSection = document.getElementById("music");
        const instrumentsSection = document.getElementById("musicinstruments");
        const albumsSection = document.getElementById("albums");
        const contactSection = document.getElementById("contact");
        sections = [
          musicHeroSection,
          instrumentsSection,
          albumsSection,
          contactSection,
        ].filter((section): section is HTMLElement => section !== null);
      } else {
        const heroSection = document.getElementById("hero");
        const featuredProjectsSection =
          document.getElementById("featured-work");
        const skillsSection = document.getElementById("skills");
        const albumSection = document.getElementById("albums");
        const contactSection = document.getElementById("contact");
        sections = [
          heroSection,
          featuredProjectsSection,
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
    window.addEventListener("resize", handleScroll);
    // Run on mount and again after the page sections have completed layout.
    handleScroll();
    const frameId = window.requestAnimationFrame(handleScroll);
    const settledLayoutTimer = window.setTimeout(handleScroll, 250);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settledLayoutTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMusicPage]);

  useEffect(
    () => () => {
      socialsObserverRef.current?.disconnect();
      if (socialsAnimationTimerRef.current) {
        window.clearTimeout(socialsAnimationTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      );

    const firstElement = focusableElements()[0];
    firstElement?.focus();

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        toggleMenu();
        hamburgerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = focusableElements();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [isOpen, toggleMenu]);

  const highlightSocialsOnArrival = () => {
    const socialsEl = document.getElementById("social-icons");
    if (!socialsEl) return;

    socialsObserverRef.current?.disconnect();
    if (socialsAnimationTimerRef.current) {
      window.clearTimeout(socialsAnimationTimerRef.current);
    }

    const startHighlight = () => {
      socialsObserverRef.current?.disconnect();
      socialsEl.classList.remove("highlight-socials");
      void socialsEl.offsetWidth;
      socialsEl.classList.add("highlight-socials");
      socialsAnimationTimerRef.current = window.setTimeout(() => {
        socialsEl.classList.remove("highlight-socials");
      }, 3400);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
          startHighlight();
        }
      },
      { threshold: [0.75] }
    );

    socialsObserverRef.current = observer;
    observer.observe(socialsEl);
  };

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
        window.dispatchEvent(
          new CustomEvent<PortfolioNavigationDetail>(
            PORTFOLIO_NAVIGATION_EVENT,
            {
              detail: { targetY: targetEl.offsetTop },
            }
          )
        );
        targetEl.scrollIntoView({ behavior: "smooth" });
      } else if (pathname !== "/") {
        // If not found and not on the homepage, navigate there.
        router.push(`/${href}`);
      }
      // Special handling for footer highlighting (if needed)
      if (targetId === "footer") {
        highlightSocialsOnArrival();
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 z-[1000] bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <button
          ref={hamburgerRef}
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="portfolio-navigation-menu"
          className={`absolute top-4 right-4 cursor-pointer text-2xl transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
            isDark ? "text-black" : "text-white"
          }`}
        >
          ☰
        </button>
      </div>
      <motion.div
        ref={menuRef}
        id="portfolio-navigation-menu"
        aria-hidden={!isOpen}
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.8)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "circle(120% at 99% 4%)",
            transition: shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 },
          },
          closed: {
            clipPath: "circle(0% at 98.5% 4%)",
            transition: shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 400, damping: 40 },
          },
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <motion.div key={link.name} whileHover={{ scale: 1.1 }}>
                <a
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  className="text-white text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                  tabIndex={isOpen ? 0 : -1}
                  className="text-white text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              type="button"
              onClick={toggleMenu}
              tabIndex={isOpen ? 0 : -1}
              className="text-white text-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
