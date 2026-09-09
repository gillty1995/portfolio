"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedInputProps extends HTMLMotionProps<"input"> {
  label: string;
  hideLabel?: boolean;
}

export default function AnimatedInput({
  label,
  hideLabel = false,
  ...props
}: AnimatedInputProps) {
  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={props.id}
        className={
          hideLabel
            ? "sr-only"
            : "mb-1 block text-sm font-medium text-gray-700"
        }
      >
        {label}
      </label>
      <motion.input
        {...props}
        className={props.className}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: 0,
          fontSize: 14,
          padding: 0,
          ...props.style,
        }}
      />
    </div>
  );
}
