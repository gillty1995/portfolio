"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import AnimatedInput from "@/components/AnimatedInput";

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
      fallback={
        <div className="flex justify-center items-center min-h-screen text-center">
          Loading...
        </div>
      }
    >
      <section
        id="contact"
        className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center justify-center py-20 px-4"
      >
        <motion.div
          className="w-full max-w-2xl p-8 shadow-lg rounded-lg bg-white"
          initial={{ opacity: 0, y: 50 }}
          {...motionProps}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl text-gray-800 font-bold mb-4 text-center">
            Contact Me
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Want to work together? Send me a message below if you&apos;d like to
            collaborate on a website, are interested in music lessons, or have
            something else on your mind. I&apos;d love to connect!
          </p>
          {status === "success" ? (
            <div className="text-center">
              <p className="text-green-600 font-bold mb-4">
                Message sent successfully!
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-300 text-white rounded-full hover:bg-gray-400 duration-300 ease-in-out transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-gray-800 space-y-6">
              <AnimatedInput
                label="Your Email"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AnimatedInput
                label="Subject"
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="bg-gray-100 text-gray-800 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-6 py-3 !bg-gray-300 text-gray-800 shadow-lg rounded-full hover:!bg-gray-200 duration-500 ease-in-out transition-colors cursor-pointer"
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
              {status === "error" && (
                <p className="text-center text-red-600">
                  There was an error sending your message. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </section>
    </Suspense>
  );
}
