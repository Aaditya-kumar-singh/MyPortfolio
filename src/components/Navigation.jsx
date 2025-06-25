import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageSquare, ChevronDown } from 'lucide-react';

// Navigation Component
 const Navigation = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experience', label: 'Certifications', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">Portfolio</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === id
                    ? 'text-orange-500 bg-orange-500/10'
                    : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentPage(id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === id
                    ? 'text-orange-500 bg-orange-500/10'
                    : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navigation;