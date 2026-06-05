import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navigation({ isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🏏
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">Box Cricket Academy</span>
            <span className="font-bold text-xl text-primary sm:hidden">BCA</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="#slots" className="text-foreground hover:text-primary transition-colors font-medium">Book Slot</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">Features</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted hover:bg-border transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={20} className="text-accent" />
              ) : (
                <Moon size={20} className="text-slate-600" />
              )}
            </button>

            {/* Login Button */}
            <button className="hidden sm:block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary_dark transition-colors">
              Login
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-muted hover:bg-border transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-muted rounded-lg p-4 mt-2">
            <a href="#home" className="block px-4 py-2 text-foreground hover:bg-border rounded-lg transition-colors">Home</a>
            <a href="#slots" className="block px-4 py-2 text-foreground hover:bg-border rounded-lg transition-colors">Book Slot</a>
            <a href="#features" className="block px-4 py-2 text-foreground hover:bg-border rounded-lg transition-colors">Features</a>
            <a href="#contact" className="block px-4 py-2 text-foreground hover:bg-border rounded-lg transition-colors">Contact</a>
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary_dark transition-colors mt-4">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
