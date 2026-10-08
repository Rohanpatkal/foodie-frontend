'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Order, OrdersResponse, OrderStatus } from '@/types/order';
import { api } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import {
  ShieldAlert,
  ClipboardList,
  Utensils,
  RefreshCw,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Filter,
} from 'lucide-react';

const ALL_STATUSES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export default function AdminOrdersPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setActionError('');
    try {
      const res = await api.get<OrdersResponse>('/admin/orders');
      if (res.success && res.data?.orders) {
        setOrders(res.data.orders);
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to fetch admin orders.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAdmin, authLoading]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    setActionError('');
    setSuccessMsg('');

    try {
      const res = await api.patch<{ success: boolean; data: { order: Order } }>(
        `/admin/orders/${orderId}/status`,
        { status: newStatus }
      );

      if (res.success && res.data?.order) {
        setSuccessMsg(`Order #${orderId.slice(-6).toUpperCase()} updated to "${newStatus}"`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'All') return true;
    return order.status === filterStatus;
  });

  if (authLoading) {
    return <LoadingState message="Checking admin permissions..." />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Access Required</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          You must be logged into an administrator account to manage customer orders.
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Admin Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Customer Orders Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and update fulfillment lifecycle from pending to delivered
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-sm transition-colors"
          >
            <Utensils className="w-4 h-4" />
            <span>Manage Foods</span>
          </Link>

          <button
            onClick={fetchOrders}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {actionError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => setFilterStatus('All')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filterStatus === 'All'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Orders ({orders.length})
        </button>

        {ALL_STATUSES.map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {isLoading ? (
        <LoadingState message="Fetching orders..." />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Orders Found"
          description={
            filterStatus === 'All'
              ? 'No customer orders have been placed yet.'
              : `No orders currently in "${filterStatus}" status.`
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const shortId = order._id.slice(-6).toUpperCase();
            const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={order._id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono font-black text-slate-900 text-base">
                        Order #{shortId}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {dateStr}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-slate-800">{order.customerName}</span>
                      <span>({order.customerEmail})</span>
                    </div>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Change Status:</span>
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value as OrderStatus)
                      }
                      className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-slate-800 focus:outline-hidden focus:border-purple-600 disabled:opacity-50 cursor-pointer shadow-2xs"
                    >
                      {ALL_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Items & Address Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-sm">
                  {/* Items snapshot */}
                  <div className="lg:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-2">
                      Order Items Snapshot
                    </span>
                    <div className="space-y-1.5">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-800">
                            {it.image} {it.foodName} <span className="text-slate-400">× {it.quantity}</span>
                          </span>
                          <span className="font-bold text-slate-700">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination & Total */}
                  <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                        Delivery Destination
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{order.address}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-400">Grand Total</span>
                      <span className="text-lg font-black text-[#ff5a36]">₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
