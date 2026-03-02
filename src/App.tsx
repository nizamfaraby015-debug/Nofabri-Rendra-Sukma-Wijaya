/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Scene } from './components/Scene';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-obsidian text-white selection:bg-gold/30 selection:text-white">
      <Navbar />
      
      {/* Hero Section with 3D Background */}
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 z-0">
          <Scene isBlurred={isChatOpen} />
        </div>
        <Hero />
      </div>

      <Features />
      <Footer />
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  );
}
