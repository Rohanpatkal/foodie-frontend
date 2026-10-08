'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';
import { SingleOrderResponse } from '@/types/order';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, cartTotal, clearCart } = useCart();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!address.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Add food items before checkout.');
      return;
    }

    if (paymentMethod === 'online') {
      setErrorMessage('Online payment is coming soon! Please choose Cash on Delivery.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        address: address.trim(),
        items: items.map((item) => ({
          foodId: item.food._id,
          quantity: item.quantity,
        })),
      };

      const res = await api.post<SingleOrderResponse>('/orders', orderPayload);

      if (res.success && res.data?.order) {
        // Clear local cart on successful order placement
        clearCart();
        router.push('/orders');
      } else {
        setErrorMessage(res.message || 'Failed to place order.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Delivery & Payment Details */}
      <div className="lg:col-span-7 space-y-6">
        {/* Customer Information Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ff5a36] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Customer Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Name</span>
              <span className="font-bold text-slate-800">{user?.name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Email</span>
              <span className="font-bold text-slate-800">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ff5a36] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delivery Address</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Complete Address (House/Flat No, Street, Landmark)
            </label>
            <div className="relative">
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 402, Sunshine Apartments, 12th Main Road, Indiranagar, Bengaluru"
                className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-[#ff5a36] transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              Standard estimated delivery time: 30-40 minutes
            </p>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ff5a36] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Payment Option</h3>
          </div>

          <div className="space-y-3">
            {/* COD Option */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === 'cod'
                  ? 'border-[#ff5a36] bg-orange-50/40'
                  : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mt-1 accent-[#ff5a36]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pay via cash or UPI directly when your food arrives at your door.
                </p>
              </div>
            </label>

            {/* Online Option (Coming Soon) */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all opacity-70 cursor-not-allowed ${
                paymentMethod === 'online'
                  ? 'border-[#ff5a36] bg-orange-50/40'
                  : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <input
                type="radio"
                name="payment"
                disabled
                checked={paymentMethod === 'online'}
                onChange={() => setPaymentMethod('online')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-500 text-sm flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    Online Payment (Cards / UPI / NetBanking)
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Secure Razorpay/Stripe online gateway integration in progress.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary & Place Order Button */}
      <div className="lg:col-span-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
          <h3 className="font-extrabold text-lg text-slate-900 pb-4 border-b border-slate-100 mb-4">
            Order Review ({items.length} items)
          </h3>

          {/* Items preview list */}
          <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1 mb-6">
            {items.map((item) => (
              <div key={item.food._id} className="py-3 flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">{item.food.image}</span>
                  <div className="truncate">
                    <p className="font-bold text-slate-900 truncate">{item.food.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800 shrink-0">
                  ₹{item.food.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2.5 text-sm pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">₹{cartTotal}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex items-center justify-between text-slate-900 pt-3 border-t border-dashed border-slate-200">
              <span className="font-black text-base">Total to Pay</span>
              <span className="font-black text-2xl text-[#ff5a36]">₹{cartTotal}</span>
            </div>
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#ff5a36] hover:bg-[#e04522] text-white font-black text-base shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Confirming Order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Place Order (₹{cartTotal})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
