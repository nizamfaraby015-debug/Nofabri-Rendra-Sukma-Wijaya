import { motion } from 'motion/react';
import { ShieldCheck, Globe, Users } from 'lucide-react';

const features = [
  {
    title: 'Premium Quality',
    description: 'Uncompromising standards in every pixel and line of code.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Reach',
    description: 'Connecting brands to audiences across borders and cultures.',
    icon: Globe,
  },
  {
    title: 'Expert Team',
    description: 'Curated talent delivering world-class digital experiences.',
    icon: Users,
  },
];

export function Features() {
  return (
    <section className="relative z-10 py-24 bg-obsidian">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all duration-500 hover:bg-white/[0.04]"
            >
              <motion.div 
                className="mb-6 inline-block p-3 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/10 group-hover:border-gold/40 transition-colors"
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                <feature.icon className="w-6 h-6 text-gold" />
              </motion.div>
              <h3 className="mb-3 text-xl font-serif text-white group-hover:text-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
