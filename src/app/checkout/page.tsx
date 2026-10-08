'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/components/CheckoutForm';
import { EmptyState } from '@/components/EmptyState';
import { ShieldCheck, LogIn, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { user, isLoading } = useAuth();
  const { items } = useCart();

  if (!isLoading && !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#ff5a36] border border-orange-100 flex items-center justify-center mx-auto mb-4 text-3xl">
          🔐
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Sign in to complete checkout</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Please log in to your account or register to save your delivery address and track your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff5a36] text-white font-bold hover:bg-[#e04522] transition-colors shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
          >
            <span>Register</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon="🛒"
          title="Nothing to Checkout"
          description="Your cart is currently empty. Add items from the menu before proceeding to checkout."
          actionText="Browse Menu"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <span>Checkout & Delivery</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Provide your delivery location to receive your order</p>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#ff5a36] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <CheckoutForm />
    </div>
  );
}
