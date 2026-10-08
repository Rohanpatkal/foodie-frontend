'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Trash2, ShieldCheck } from 'lucide-react';

export const CartSummary: React.FC = () => {
  const { cartCount, cartTotal, clearCart } = useCart();
  const deliveryFee = 0; // Free delivery

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <h3 className="font-extrabold text-lg text-slate-900">Order Summary</h3>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="space-y-3.5 text-sm mb-6">
        <div className="flex items-center justify-between text-slate-600">
          <span>Items ({cartCount})</span>
          <span className="font-semibold text-slate-900">₹{cartTotal}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Delivery Charges</span>
          <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
            FREE
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Packaging & Taxes</span>
          <span className="font-semibold text-slate-900">₹0</span>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-base font-extrabold text-slate-900 block">Grand Total</span>
            <span className="text-xs text-slate-400">Inclusive of all taxes</span>
          </div>
          <span className="text-2xl font-black text-[#ff5a36]">₹{cartTotal + deliveryFee}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#ff5a36] hover:bg-[#e04522] text-white font-extrabold text-base shadow-md shadow-orange-500/20 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Safe and contactless delivery guaranteed</span>
      </div>
    </div>
  );
};
