"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Mail, GraduationCap, Briefcase, Users, Award } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import { facultyData, Faculty } from "../lib/data";

const FacultyList = () => {
    const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    // Use static data directly
    const filteredFaculty = facultyData.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.subjects.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="faculty" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 inline-block relative pb-2">
                        Our Faculty
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full"></span>
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Meet the dedicated mentors shaping the future of technology with their expertise and passion.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm shadow-sm transition-all duration-200"
                            placeholder="Search by name or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {facultyData.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="No faculty members found"
                        description="Faculty information will be updated soon. Please check back later."
                    />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredFaculty.slice(0, visibleCount).map((member, index) => (
                                <motion.div
                                    key={member._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectedFaculty(member)}
                                    className="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-28 h-28 rounded-full bg-white p-1 border-2 border-[#D4AF37] transition-all duration-300 shadow-md relative overflow-hidden">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="rounded-full object-cover object-[50%_25%]"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-3xl font-serif font-bold text-[#D4AF37]">
                                                {member.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">
                                        {member.designation}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {filteredFaculty.length > visibleCount && (
                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 10)}
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    View More Faculty
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Details Modal */}
                <AnimatePresence>
                    {selectedFaculty && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedFaculty(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                            />

                            {/* Card Content */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative max-h-[90vh] overflow-y-auto"
                                >
                                    {/* Top Pattern */}
                                    <div className="h-32 bg-primary relative shrink-0">
                                        <button
                                            onClick={() => setSelectedFaculty(null)}
                                            aria-label="Close modal"
                                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-10"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Profile Image Overlap */}
                                    <div className="relative -mt-16 flex justify-center shrink-0">
                                        <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center">
                                            {selectedFaculty.image ? (
                                                <Image
                                                    src={selectedFaculty.image}
                                                    alt={selectedFaculty.name}
                                                    fill
                                                    className="object-cover object-[50%_25%]"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl font-serif font-bold text-[#D4AF37]">
                                                    {selectedFaculty.name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 text-center">
                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                                            {selectedFaculty.name}
                                        </h3>
                                        <p className="text-primary font-medium">{selectedFaculty.designation}</p>

                                        <div className="mt-8 space-y-4 text-left">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <Briefcase className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Designation</span>
                                                        <p className="text-sm font-semibold text-gray-900">{selectedFaculty.designation}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <GraduationCap className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Qualification</span>
                                                        <p className="text-sm font-semibold text-gray-900">{selectedFaculty.qualification}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <Users className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Experience</span>
                                                        <p className="text-sm font-semibold text-gray-900">{selectedFaculty.experience} Years</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <Award className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Achievements</span>
                                                        <p className="text-sm font-semibold text-gray-900">{selectedFaculty.achievements}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <Briefcase className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Subjects</span>
                                                        <p className="text-sm font-semibold text-gray-900">{selectedFaculty.subjects}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                                        <Mail className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">College Mail</span>
                                                        <a href={`mailto:${selectedFaculty.email}`} className="text-sm font-semibold text-primary hover:underline block break-all">
                                                            {selectedFaculty.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
export default FacultyList;
