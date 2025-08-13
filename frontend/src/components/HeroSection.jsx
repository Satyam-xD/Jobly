import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") searchJobHandler();
    };

    return (
        <div className="relative overflow-hidden">
            {/* Floating icons background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 to-indigo-50/90"></div>
                {['💼', '📊', '🔍', '💻', '📝'].map((icon, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl opacity-10"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 40 - 20],
                            x: [0, Math.random() * 40 - 20],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        {icon}
                    </motion.div>
                ))}
            </div>

            <div className="text-center px-4 py-16 md:py-20 lg:py-24 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                >
                    {/* Badge */}
                    <motion.span 
                        className="inline-block mx-auto px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 font-medium text-sm shadow-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        No. 1 Job Hunt Website
                    </motion.span>

                    {/* Title */}
                    <motion.h1 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        Search, Apply & <br /> 
                        <span className="bg-gradient-to-r from-[#F83002] to-[#6A38C2] bg-clip-text text-transparent">
                            Get Hired Faster
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        Discover thousands of job opportunities and take the next step in your career
                    </motion.p>

                    {/* Search bar */}
                    <motion.div
                        className="flex w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white shadow-md border border-gray-200 pl-6 pr-2 rounded-full items-center gap-2 mx-auto mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            type="text"
                            placeholder="Job title, company, or keywords"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="outline-none border-none w-full py-4 text-gray-700 placeholder-gray-400"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5b30a6] hover:to-[#e02b02] h-12 w-12 p-0 flex-shrink-0 shadow-lg hover:shadow-[#6A38C2]/30"
                            size="icon"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </motion.div>

                    {/* Popular tags - Fixed alignment */}
                    <motion.div
                        className="flex items-center justify-center gap-2 mt-6 flex-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                    >
                        <span className="text-xs md:text-sm text-gray-500">Popular:</span>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {['Developer', 'Designer', 'Marketing', 'Remote'].map((tag) => (
                                <motion.button
                                    key={tag}
                                    onClick={() => setQuery(tag)}
                                    className="text-xs md:text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;