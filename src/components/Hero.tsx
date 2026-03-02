import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative z-10 flex items-center min-h-screen px-6 pt-20 pointer-events-none">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left pointer-events-auto"
        >
          <h2 className="mb-6 text-sm font-medium tracking-[0.3em] text-gold uppercase font-sans">
            Elevate Your Vision
          </h2>
          <h1 className="mb-8 text-6xl font-bold leading-tight tracking-tighter text-white md:text-7xl lg:text-8xl font-serif">
            Premium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
              Digital Solutions
            </span>
          </h1>
          <p className="max-w-lg mb-10 text-lg font-light leading-relaxed text-white/70">
            For modern brands seeking the extraordinary. We blend architectural intelligence with immersive design.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 overflow-hidden rounded-none bg-transparent border border-gold/30 text-white transition-all hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-gold/20 to-transparent transition-all duration-[250ms] ease-out group-hover:w-full" />
            <span className="relative z-10 flex items-center gap-3 font-medium tracking-widest uppercase text-sm">
              Get Started <ArrowRight className="w-4 h-4 text-gold" />
            </span>
          </motion.button>
        </motion.div>

        {/* Right Content - Spacer for the 3D Globe which is in background but positioned right via camera/css if needed, 
            but since Scene is absolute full screen, we just leave this empty or use it to push content. 
            Actually, let's keep it empty so the globe is visible here. */}
        <div className="hidden lg:block h-full min-h-[500px]">
          {/* The globe is rendered by Scene.tsx in the background. 
              We might want to adjust Scene camera to offset the globe to the right, 
              but for now let's just let it be centered or maybe we can move the scene container?
              
              Actually, let's leave the globe centered in the Scene, and maybe the text overlaps?
              The prompt asked for "Split screen hero design... Right side features the 3D globe."
              
              To achieve this without changing Scene logic too much, we can just let the text be on the left.
          */}
        </div>
      </div>
    </div>
  );
}
