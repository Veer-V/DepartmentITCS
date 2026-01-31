"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { openLogin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Programs", href: "#programs", hasDropdown: true },
        { name: "Events", href: "#events", hasDropdown: true },
        { name: "Faculty", href: "#faculty" },
        { name: "E-Library", href: "#elibrary" },
        { name: "Alumni", href: "#alumni" },
        { name: "Gallery", href: "#gallery" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={clsx(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-white/20 py-2 text-gray-800"
                    : "bg-transparent py-4 text-white"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* College Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center group">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 hover:scale-110 transition-transform duration-300">
                                <Image
                                    src="/college-logo.png"
                                    alt="College Logo"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                                        scrolled ? "text-gray-700 hover:text-primary" : "text-gray-200 hover:text-white"
                                    )}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown className="w-3 h-3 mt-0.5" />}
                                </Link>
                                {/* Simplified Hover Effect or Dropdown Placeholder can go here if needed */}
                            </div>
                        ))}
                    </div>

                    {/* Right Action Area */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <button
                            onClick={openLogin}
                            className={clsx(
                                "text-sm font-semibold transition-colors",
                                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-accent"
                            )}
                        >
                            Login / Register
                        </button>
                        <Link
                            href="/apply"
                            className="bg-accent hover:bg-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            Apply Now
                        </Link>
                        <div className="relative w-16 h-16 hover:scale-110 transition-transform duration-300 cursor-pointer bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 p-1">
                            <Image
                                src="/department-logo.png"
                                alt="Department Logo"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center gap-3">
                        <div className="relative w-12 h-12 hover:scale-110 transition-transform duration-300 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 p-0.5">
                            <Image
                                src="/department-logo.png"
                                alt="Department Logo"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                        <Link
                            href="/apply"
                            className="mr-4 bg-accent hover:bg-amber-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                        >
                            Apply
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={clsx(
                                "inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-200",
                                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-accent"
                            )}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div >
            </div >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-700 hover:text-primary hover:bg-gray-50/50 block px-3 py-3 rounded-md text-base font-medium border-b border-gray-50 last:border-0 transition-colors"
                                    >
                                        <div className="flex justify-between items-center">
                                            {link.name}
                                            {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                                        </div>
                                    </Link>
                                ))}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => { setIsOpen(false); openLogin(); }}
                                        className="block w-full text-center text-gray-700 hover:text-primary font-semibold py-3 hover:bg-gray-50/50 rounded-md transition-colors"
                                    >
                                        Login / Register
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </nav >
    );
};

export default Navbar;
