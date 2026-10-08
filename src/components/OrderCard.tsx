import React from 'react';
import { Order } from '@/types/order';
import { StatusBadge } from '@/components/StatusBadge';
import { MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const shortId = order._id.slice(-6).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono font-black text-slate-900 text-base">
              Order #{shortId}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Total Paid/Due</span>
          <span className="text-xl font-black text-[#ff5a36]">₹{order.total}</span>
        </div>
      </div>

      {/* Body: Order Items Snapshot */}
      <div className="p-5 sm:p-6 space-y-4">
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Ordered Items
          </h5>
          <div className="space-y-2.5">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-100/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.image || '🍽️'}</span>
                  <div>
                    <span className="font-bold text-slate-800">{item.foodName}</span>
                    <span className="text-slate-400 text-xs ml-2">× {item.quantity}</span>
                  </div>
                </div>
                <span className="font-black text-slate-800">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address & Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700 block mb-0.5">Delivery Destination</span>
              <span className="text-slate-600 line-clamp-2">{order.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
            <CreditCard className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700 block mb-0.5">Payment</span>
              <span className="text-slate-600">{order.paymentMethod || 'Cash on Delivery'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
