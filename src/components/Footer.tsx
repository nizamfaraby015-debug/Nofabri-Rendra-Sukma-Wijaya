import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-obsidian border-t border-white/5 pt-20 pb-10">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-white block mb-6">
              AETHER<span className="text-gold">.</span>
            </a>
            <p className="text-white/40 font-light text-sm leading-relaxed">
              Elevating digital experiences through architectural intelligence and premium design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium tracking-widest text-white mb-6 uppercase">Explore</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-gold text-sm transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium tracking-widest text-white mb-6 uppercase">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-gold text-sm transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-medium tracking-widest text-white mb-6 uppercase">Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border-b border-white/10 py-3 pr-10 text-sm text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs font-light mb-4 md:mb-0">
            © 2026 Aether Dynamics. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-white/40 hover:text-gold transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
