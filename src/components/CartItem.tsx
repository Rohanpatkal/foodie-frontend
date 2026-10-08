'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const subtotal = item.food.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-orange-100 transition-all">
      {/* Item info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-orange-50 border border-orange-100/60 flex items-center justify-center text-3xl shrink-0">
          {item.food.image}
        </div>
        <div>
          <h4 className="font-extrabold text-slate-900 text-base mb-1">{item.food.name}</h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">
              {item.food.category}
            </span>
            <span>₹{item.food.price} each</span>
          </div>
        </div>
      </div>

      {/* Quantity & subtotal & remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity buttons */}
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-[#ff5a36] hover:text-white flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 text-center font-black text-slate-900 text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 rounded-lg bg-[#ff5a36] text-white hover:bg-[#e04522] flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[80px]">
          <span className="text-[11px] text-slate-400 block uppercase font-bold">Subtotal</span>
          <span className="text-lg font-black text-slate-900">₹{subtotal}</span>
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeItem(item.food._id)}
          title="Remove from cart"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
