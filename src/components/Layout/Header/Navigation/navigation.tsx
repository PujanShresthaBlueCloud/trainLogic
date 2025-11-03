"use client";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex flex-col transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-0">
                <span className="text-xl font-bold" style={{ color: '#1A202C' }}>
                  TR
                </span>
                <span
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  }}
                >
                  [AI]
                </span>
                <span className="text-xl font-bold" style={{ color: '#1A202C' }}>
                  NED
                </span>
              </div>
              <div
                className="text-xs font-semibold tracking-widest"
                style={{ color: '#1A202C' }}
              >
                LOGIC
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-semibold transition-colors hover:text-purple-600"
                  style={{ color: '#1F2937' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              style={{ color: '#1F2937' }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-lg md:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: '#1F2937' }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full px-6 py-3 rounded-lg font-semibold text-white"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
              }}
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
export default Navigation;
