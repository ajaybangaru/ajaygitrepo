import { motion, AnimatePresence } from "framer-motion";
import { QUERIES } from "../queries";
import { useState } from "react";
import QueryView from "./QueryView";

export default function QuerySlider() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    const handlePrev = () => {
        if (index > 0) {
            setDirection(-1);
            setIndex(i => i - 1);
        }
    };

    const handleNext = () => {
        if (index < QUERIES.length - 1) {
            setDirection(1);
            setIndex(i => i + 1);
        }
    };

    const handleDotClick = (newIndex: number) => {
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    };

    return (
        <div className="w-full h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden relative">

            {/* BACKGROUND DECORATIVE ELEMENTS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* NAVIGATION BUTTONS */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                {index > 0 && (
                    <motion.button
                        onClick={handlePrev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                )}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                {index < QUERIES.length - 1 && (
                    <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                )}
            </div>

            {/* PROGRESS INDICATOR */}
            <motion.div className="absolute top-6 right-6 z-20 bg-gray-800 bg-opacity-60 px-4 py-2 rounded-full border border-gray-700">
                <span className="text-sm font-medium text-gray-300">
                    <span className="text-emerald-400 font-bold">{index + 1}</span> / {QUERIES.length}
                </span>
            </motion.div>

            {/* QUERY INDICATOR DOTS */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-11 left-1/2 -translate-x-1/2 z-20 flex gap-2"
            >
                {QUERIES.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`transition-all duration-300 rounded-full ${
                            i === index
                                ? "bg-linear-to-r from-blue-400 to-emerald-400 w-3 h-3"
                                : "bg-gray-600 w-2 h-2 hover:bg-gray-500"
                        }`}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </motion.div>

            {/* MAIN CONTENT */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full relative z-10"
                >
                    <QueryView query={QUERIES[index]} />
                </motion.div>
            </AnimatePresence>

        </div>
    );
}
