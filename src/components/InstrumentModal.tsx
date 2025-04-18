"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface InstrumentModalProps {
  instrument: {
    name: string;
    details: string;
  };
  onClose: () => void;
}

const InstrumentModal: React.FC<InstrumentModalProps> = ({
  instrument,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      {/* Shared layout container for smooth expansion from the icon */}
      <motion.div
        className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg z-10 w-full max-w-md sm:max-w-lg mx-4"
        layoutId={`instrument-${instrument.name}`}
      >
        {/* Inner container fades in/out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button (styled like MusicModal) */}
          <motion.button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-black bg-transparent border-none cursor-pointer"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 180, opacity: 1 }}
            exit={{ rotate: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">X</span>
          </motion.button>

          <h3 className="text-gray-800 text-xl sm:text-2xl font-bold mb-4 max-sm:text-sm max-sm:underline">
            {instrument.name}
          </h3>
          <p className="text-gray-600">{instrument.details}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InstrumentModal;
