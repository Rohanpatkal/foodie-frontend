'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { OrderCard } from '@/components/OrderCard';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { Order, OrdersResponse } from '@/types/order';
import { api } from '@/lib/api';
import { ClipboardList, RefreshCw, AlertCircle, LogIn } from 'lucide-react';

export default function CustomerOrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get<OrdersResponse>('/orders');
      if (res.success && res.data?.orders) {
        setOrders(res.data.orders);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching orders.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4">
        <LoadingState message="Checking authentication..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#ff5a36] border border-orange-100 flex items-center justify-center mx-auto mb-4 text-3xl">
          🔒
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Login to view your orders</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Sign in to view your past orders, delivery updates and live order tracking.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff5a36] text-white font-bold hover:bg-[#e04522] transition-colors shadow-sm"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <ClipboardList className="w-7 h-7 text-[#ff5a36]" />
            <span>My Orders & Status</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track live preparation and delivery status of your recent meals
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {isLoading ? (
        <LoadingState message="Fetching your order history..." />
      ) : error ? (
        <div className="text-center py-16">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <p className="text-slate-800 font-bold mb-2">Could Not Load Orders</p>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-5 py-2 rounded-xl bg-[#ff5a36] text-white text-sm font-bold"
          >
            Retry
          </button>
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No Orders Placed Yet"
          description="You haven't placed any orders with Foodie yet. Check out our menu and treat yourself to something delicious!"
          actionText="Order Food Now"
          actionHref="/"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
