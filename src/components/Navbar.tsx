import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { name: 'HOME', href: '#' },
  { name: 'ABOUT', href: '#' },
  { name: 'SERVICES', href: '#' },
  { name: 'PORTFOLIO', href: '#' },
  { name: 'CONTACT', href: '#' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-obsidian/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-white">
          AETHER<span className="text-gold">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-light tracking-[0.15em] text-white/80 hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-light tracking-[0.2em] text-white hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
