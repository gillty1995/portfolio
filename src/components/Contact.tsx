"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import AnimatedInput from "@/components/AnimatedInput";
import LoadingScreen from "@/components/LoadingScreen";

export default function Contact() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const contactFromMusic = searchParams.get("contactFromMusic") === "true";

  const [immediateAnimate, setImmediateAnimate] = useState(contactFromMusic);

  useEffect(() => {
    if (immediateAnimate) {
      const timer = setTimeout(() => {
        setImmediateAnimate(false);
        router.replace(window.location.pathname + window.location.hash);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [immediateAnimate, router]);

  const motionProps = immediateAnimate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: false } };

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <Suspense
      fallback={<LoadingScreen />}
    >
      <section
        id="contact"
        className="contact-section flex min-h-[64dvh] items-start justify-center px-5 pt-8 pb-14 sm:px-8 sm:pt-10 sm:pb-16"
      >
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 32 }}
          {...motionProps}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="sr-only">Contact</h2>
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-80"
            >
              <p className="mb-6 text-sm font-light tracking-[-0.03em] text-slate-700 sm:text-base">
                Message sent. Thank you.
              </p>
              <button
                onClick={resetForm}
                className="rounded-full border border-slate-300/80 bg-white/50 px-5 py-2.5 text-xs font-light text-slate-700 transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-slate-800">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="contact-field px-5 py-4 sm:px-6">
                  <AnimatedInput
                    label="Email"
                    hideLabel
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent font-light tracking-[-0.025em] text-slate-800 outline-none placeholder:text-slate-500"
                  />
                </div>
                <div className="contact-field px-5 py-4 sm:px-6">
                  <AnimatedInput
                    label="Subject"
                    hideLabel
                    id="subject"
                    type="text"
                    required
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-transparent font-light tracking-[-0.025em] text-slate-800 outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="contact-field relative mt-4 p-2 sm:p-3">
                <label
                  htmlFor="message"
                  className="sr-only"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Write a message..."
                  className="relative z-[1] block min-h-44 w-full resize-none rounded-[1.3rem] border border-transparent bg-transparent px-4 py-4 text-sm font-light leading-relaxed tracking-[-0.025em] text-slate-800 outline-none placeholder:text-slate-500 sm:min-h-52 sm:px-5 sm:text-base"
                />
              </div>

              <div className="mt-4 flex min-h-12 items-center justify-between">
                <div aria-live="polite" className="min-w-0 pr-4">
                  {status === "error" && (
                    <p className="text-[0.65rem] font-light leading-relaxed text-red-700 sm:text-xs">
                      Couldn&apos;t send. Please try again.
                    </p>
                  )}
                  {status === "sending" && (
                    <p className="text-[0.65rem] font-light text-slate-500 sm:text-xs">
                      Sending...
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label={status === "sending" ? "Sending message" : "Send message"}
                  className="group flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-400/70 bg-slate-800 text-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50 sm:h-12 sm:w-12"
                >
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </section>
    </Suspense>
  );
}
