'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { EmptyState } from '@/components/EmptyState';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, cartCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon="🛒"
          title="Your Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Explore our mouthwatering menu and find something delicious!"
          actionText="Explore Food Menu"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-[#ff5a36]" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#ff5a36] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Cart Grid: Items on left, Summary on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.food._id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
