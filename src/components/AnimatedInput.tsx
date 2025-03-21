"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedInputProps extends HTMLMotionProps<"input"> {
  label: string;
}

export default function AnimatedInput({ label, ...props }: AnimatedInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <motion.input
        {...props}
        style={{
          width: "100%",
          background:
            "linear-gradient(to right, #ddd -200%, #fff -100%, #ddd 0%, #fff 100%)",
          backgroundSize: "200% 100%",
          border: "none",
          borderRadius: 10,
          fontSize: 16,
          padding: "0.5rem 1rem",
          ...props.style,
        }}
        whileFocus={{
          background: [
            "linear-gradient(to right, #ddd -200%, #fff -100%, #ddd 0%, #fff 100%)",
            "linear-gradient(to right, #ddd -100%, #fff 0%, #ddd 100%, #fff 200%)",
            "linear-gradient(to right, #ddd 0%, #fff 100%, #ddd 200%, #fff 300%)",
          ],
        }}
        transition={{ duration: 2, ease: "linear" }} // no repeat so it animates once on focus
      />
    </div>
  );
}
