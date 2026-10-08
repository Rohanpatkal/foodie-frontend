'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { FoodGrid } from '@/components/FoodGrid';
import { LoadingState } from '@/components/LoadingState';
import { Food, FoodsResponse } from '@/types/food';
import { api } from '@/lib/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<FoodsResponse>('/foods');
      if (res.success && res.data?.foods) {
        setFoods(res.data.foods);
      } else {
        setError('Failed to load foods menu.');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {isLoading ? (
          <LoadingState message="Fetching our latest menu..." />
        ) : error ? (
          <div className="max-w-md mx-auto text-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Could Not Load Menu</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{error}</p>
            <button
              onClick={fetchFoods}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff5a36] text-white font-bold hover:bg-[#e04522] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <FoodGrid foods={foods} />
        )}
      </section>
    </div>
  );
}
