'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Food, FoodsResponse } from '@/types/food';
import { api } from '@/lib/api';
import { LoadingState } from '@/components/LoadingState';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Utensils,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';

const COMMON_EMOJIS = ['🍕', '🍔', '🍟', '🍝', '🥪', '🍛', '🥟', '🥤', '🌮', '🥗', '🍩', '🍦'];

export default function AdminFoodPage() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();

  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Add Food Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Pizza');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('🍕');
  const [newDescription, setNewDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFoods = async () => {
    try {
      const res = await api.get<FoodsResponse>('/foods');
      if (res.success && res.data?.foods) {
        setFoods(res.data.foods);
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to fetch food items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFoods();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAdmin, authLoading]);

  const handleCreateFood = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const res = await api.post<{ success: boolean; data: { food: Food } }>('/foods', {
        name: newName.trim(),
        category: newCategory.trim(),
        price: Number(newPrice),
        image: newImage.trim(),
        description: newDescription.trim(),
      });

      if (res.success) {
        setSuccessMsg(`Food "${newName}" created successfully!`);
        setShowAddModal(false);
        setNewName('');
        setNewPrice('');
        setNewDescription('');
        fetchFoods();
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to create food item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFood = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      return;
    }

    try {
      await api.delete(`/foods/${id}`);
      setSuccessMsg(`"${name}" was deleted successfully.`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err: any) {
      setActionError(err.message || 'Failed to delete food item');
    }
  };

  if (authLoading) {
    return <LoadingState message="Checking administrator privileges..." />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Access Required</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          You must be logged into an account with admin privileges to view this section.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff5a36] text-white font-bold"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Admin Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Food Menu Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Add, update and remove food items available for customers to order
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 font-bold text-sm transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Manage Orders</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04522] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Food Item</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Menu Items</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{foods.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Categories</span>
          <p className="text-3xl font-black text-purple-600 mt-1">
            {new Set(foods.map((f) => f.category)).size}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">System Status</span>
          <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational & Accepting Orders
          </p>
        </div>
      </div>

      {/* Food Items Table */}
      {isLoading ? (
        <LoadingState message="Loading foods..." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Food</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {foods.map((food) => (
                  <tr key={food._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{food.image}</span>
                        <span className="font-bold text-slate-900">{food.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                        {food.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">₹{food.price}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs max-w-xs truncate">
                      {food.description || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteFood(food._id, food.name)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Food Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Add New Food Item</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFood} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Crispy Tacos"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ff5a36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ff5a36] bg-white"
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Indian">Indian</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="149"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ff5a36]"
                  />
                </div>
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Select Food Emoji / Visual: {newImage}
                </label>
                <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  {COMMON_EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNewImage(emoji)}
                      className={`text-2xl p-2 rounded-lg transition-transform ${
                        newImage === emoji ? 'bg-white shadow-sm scale-110' : 'hover:scale-105'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Delicious ingredients description..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ff5a36]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04522] text-white text-sm font-bold shadow-md shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Creating...' : 'Save Food'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
