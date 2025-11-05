"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/ui/button';

interface NavLink {
  label: string;
  href: string;
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Process', href: '#process' },
    { label: 'Industries', href: '#industries'},
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    // { label: 'Team', href: '#team' },
    // { label: 'Testimonials', href: '#testimonials' },
    // { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  // Handle scroll for sticky header
  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 80);
  };

  // Detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Handle click outside mobile menu
  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      isMobileMenuOpen
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'shadow-lg bg-white'
            : 'shadow-none bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="flex flex-col transition-transform hover:scale-105 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-0">
                <span
                  className="text-xl font-bold"
                  style={{
                    color: '#1A202C',
                    fontFamily: '"Fira Code", monospace',
                  }}
                >
                  TR
                </span>
                <span
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    fontFamily: '"Fira Code", monospace',
                  }}
                >
                  [AI]
                </span>
                <span
                  className="text-xl font-bold"
                  style={{
                    color: '#1A202C',
                    fontFamily: '"Fira Code", monospace',
                  }}
                >
                  NED
                </span>
              </div>
              <div
                className="text-xs font-semibold tracking-widest"
                style={{
                  color: '#1A202C',
                  fontFamily: '"Fira Code", monospace',
                }}
              >
                LOGIC
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex grow items-center xl:justify-center justify-center space-x-10 text-17 text-midnight_text">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#8B5CF6]' : 'text-[#1F2937] hover:text-[#8B5CF6]'
                    }`}
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontSize: 15,
                      fontWeight: 100

                    }}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5"
                        style={{
                          background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  fontFamily: 'Inter, sans-serif',
                  visibility: 'hidden'
                }}
              >
                Try Free Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: '#1F2937' }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <div className="space-y-1.5">
                  <span className="block w-6 h-0.5 bg-[#1F2937]"></span>
                  <span className="block w-6 h-0.5 bg-[#1F2937]"></span>
                  <span className="block w-6 h-0.5 bg-[#1F2937]"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-in Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2
                  className="text-lg font-bold"
                  style={{
                    color: '#1A202C',
                    fontFamily: '"Fira Code", monospace',
                  }}
                >
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" style={{ color: '#1F2937' }} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col p-6 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className={`text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                        isActive
                          ? 'bg-linear-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 text-[#8B5CF6] border-l-4 border-[#8B5CF6]'
                          : 'text-[#1F2937] hover:bg-gray-100'
                      }`}
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: 15,
                        fontWeight: 100
                      }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Mobile CTA Button */}
              <div className="p-6 border-t border-gray-200 mt-auto">
                <Button
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ delay: 0.3 }}
                  onClick={() => scrollToSection('#contact')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 15,
                    fontWeight: 100,
                    visibility: 'hidden'
                  }}
                >
                  Try Free Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Additional Info */}
                <p
                  className="text-center text-xs mt-4"
                  style={{ color: '#6B7280' }}
                >
                  AI-Powered Solutions for Australian Businesses
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navigation;
