"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { programsData, Program } from "@/lib/data";
import EmptyState from "./ui/EmptyState";

const ProgramsGrid = () => {
    const [activeTab, setActiveTab] = useState<"it" | "cs" | "certificate">("it");

    return (
        <section id="programs" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 inline-block relative pb-2">
                        Our Programs
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-full"></span>
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-8 border-b-2 border-gray-200 overflow-x-auto scrollbar-hide [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
                        <button
                            onClick={() => setActiveTab("it")}
                            className={`pb-4 text-lg font-medium transition-colors relative whitespace-nowrap ${activeTab === "it"
                                ? "text-accent"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Information Technology
                            {activeTab === "it" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-[-2px] left-0 w-full h-1 bg-accent"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("cs")}
                            className={`pb-4 text-lg font-medium transition-colors relative whitespace-nowrap ${activeTab === "cs"
                                ? "text-accent"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Computer Science
                            {activeTab === "cs" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-[-2px] left-0 w-full h-1 bg-accent"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("certificate")}
                            className={`pb-4 text-lg font-medium transition-colors relative whitespace-nowrap ${activeTab === "certificate"
                                ? "text-accent"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Certificate Courses
                            {activeTab === "certificate" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-[-2px] left-0 w-full h-1 bg-accent"
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {(!programsData[activeTab] || programsData[activeTab].length === 0) ? (
                                <EmptyState
                                    icon={BookOpen}
                                    title={`No ${activeTab === "it" ? "IT" : activeTab === "cs" ? "CS" : "Certificate"} programs found`}
                                    description="Program details will be available soon."
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {programsData[activeTab].map((program: Program) => (
                                        <motion.div
                                            key={program.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ y: -5 }}
                                            className={`relative bg-white rounded-2xl p-8 shadow-sm border hover:shadow-xl transition-all duration-300 group flex flex-col h-full ${program.featured ? 'border-accent ring-1 ring-accent/20' : 'border-gray-100'}`}
                                        >
                                            {program.featured && (
                                                <div className="absolute top-4 right-4 animate-pulse">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent text-white shadow-sm">
                                                        <Sparkles className="w-3 h-3" /> FEATURED
                                                    </span>
                                                </div>
                                            )}

                                            <h3 className="text-2xl font-bold text-[#2c3e50] mb-3 group-hover:text-primary transition-colors pr-8">{program.title}</h3>
                                            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{program.description}</p>

                                            {/* Tags */}
                                            {program.tags && program.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {program.tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="space-y-4 mb-8 pt-6 border-t border-gray-100">
                                                <div className="flex justify-between items-center text-sm text-gray-600">
                                                    <span className="font-bold text-gray-900">Duration</span>
                                                    <span>{program.duration}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm text-gray-600">
                                                    <span className="font-bold text-gray-900">Seats</span>
                                                    <span>{program.seats}</span>
                                                </div>
                                            </div>

                                            <button className="w-full py-3 px-6 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg mt-auto">
                                                View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProgramsGrid;
