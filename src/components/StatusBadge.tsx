import React from 'react';
import { OrderStatus } from '@/types/order';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10';
      case 'Preparing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10';
      case 'Out for Delivery':
        return 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/10';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-500/10';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500';
      case 'Confirmed':
        return 'bg-blue-500';
      case 'Preparing':
        return 'bg-indigo-500 animate-pulse';
      case 'Out for Delivery':
        return 'bg-purple-500 animate-pulse';
      case 'Delivered':
        return 'bg-emerald-500';
      case 'Cancelled':
        return 'bg-rose-500';
      default:
        return 'bg-slate-500';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-xs ${sizeClasses} ${getStyles()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
      {status}
    </span>
  );
};
