'use client';

import React from 'react';
import { Food } from '@/types/food';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

interface FoodCardProps {
  food: Food;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(food._id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Food Visual Top */}
      <div className="relative h-44 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 flex items-center justify-center overflow-hidden">
        <span className="text-7xl filter drop-shadow-md group-hover:scale-115 transition-transform duration-300 select-none">
          {food.image}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-700 shadow-xs border border-white">
          {food.category}
        </span>
      </div>

      {/* Food Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#ff5a36] transition-colors mb-1.5">
            {food.name}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {food.description || `Fresh and appetizing ${food.name.toLowerCase()} prepared upon order.`}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-xs text-slate-600 block uppercase font-bold tracking-wider">Price</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              ₹{food.price}
            </span>
          </div>

          <div>
            {quantity > 0 ? (
              <div className="flex items-center gap-1.5 bg-orange-50 p-1 rounded-xl border border-orange-200">
                <button
                  onClick={() => updateQuantity(food._id, quantity - 1)}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-lg bg-white text-slate-800 hover:bg-[#ff5a36] hover:text-white flex items-center justify-center transition-colors shadow-xs active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-black text-slate-900 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => addToCart(food, 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-lg bg-[#ff5a36] text-white hover:bg-[#e04522] flex items-center justify-center transition-colors shadow-xs active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(food, 1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04522] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
