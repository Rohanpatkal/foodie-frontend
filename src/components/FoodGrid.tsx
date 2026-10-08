'use client';

import React, { useState, useMemo } from 'react';
import { Food } from '@/types/food';
import { FoodCard } from '@/components/FoodCard';
import { Search, Utensils, X } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

interface FoodGridProps {
  foods: Food[];
  isLoading?: boolean;
}

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Snacks', 'Pasta', 'Indian', 'Drinks'];

export const FoodGrid: React.FC<FoodGridProps> = ({ foods, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        food.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchTerm.trim() === '' ||
        food.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (food.description && food.description.toLowerCase().includes(searchTerm.toLowerCase().trim()));

      return matchesCategory && matchesSearch;
    });
  }, [foods, selectedCategory, searchTerm]);

  return (
    <div id="menu-section" className="scroll-mt-24">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#ff5a36] font-bold text-sm tracking-wider uppercase mb-1">
            <Utensils className="w-4 h-4" />
            <span>Our Delicious Offerings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Explore The Foodie Menu
          </h2>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pizza, burger, momos..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-[#ff5a36] transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ff5a36] text-white shadow-md shadow-orange-500/25 scale-102'
                  : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid or Empty */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No food items found"
          description={
            searchTerm
              ? `We couldn't find any items matching "${searchTerm}". Try a different search term or category.`
              : 'No food items are available in this category yet.'
          }
          actionText="Reset Filters"
          actionHref="#menu-section"
        />
      )}
    </div>
  );
};
