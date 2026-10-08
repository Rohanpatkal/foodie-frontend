'use client';

import React from 'react';
import { ArrowDown, Flame, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ff5a36] via-[#ff6b4a] to-[#ff4720] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-8xl">🍕</div>
        <div className="absolute bottom-10 right-10 text-8xl">🍔</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">🍟</div>
        <div className="absolute bottom-1/4 left-1/3 text-7xl">🥪</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold mb-6 border border-white/30 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Craving Something Special Today?</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-xs">
          Delicious Food Delivered <br className="hidden sm:inline" />
          <span className="text-amber-200 underline decoration-white/40 underline-offset-8">
            Hot & Fresh To You 🍕
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-orange-100 font-medium mb-10 leading-relaxed">
          Order your favourite food online quickly and easily. From sizzling pizzas to loaded
          burgers, satisfy your taste buds in minutes.
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-[#ff5a36] font-extrabold text-base sm:text-lg shadow-xl shadow-orange-950/20 hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/20">
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xs py-3 px-4 rounded-xl border border-white/15">
            <Clock className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-bold">Fast 30-Min Delivery</span>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xs py-3 px-4 rounded-xl border border-white/15">
            <Flame className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-bold">Always Piping Hot</span>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xs py-3 px-4 rounded-xl border border-white/15">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-bold">100% Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
