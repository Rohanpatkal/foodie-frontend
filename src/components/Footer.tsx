import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#ff5a36] flex items-center justify-center text-white shadow-xs">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                Foodie<span className="text-[#ff5a36]">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Foodie is your go-to modern food ordering destination. Delivering sizzling hot,
              authentic, and hygienic dishes right to your doorstep in minutes.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-[#ff5a36] transition-colors">
                  Food Menu
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#ff5a36] transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#ff5a36] transition-colors">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Support & Contact</h4>
            <p className="text-sm text-slate-500 mb-2">Need help with an order?</p>
            <p className="text-sm font-bold text-slate-800 mb-1">support@foodie.com</p>
            <p className="text-xs text-slate-400">Available 7 days a week, 9 AM - 11 PM</p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Foodie Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
