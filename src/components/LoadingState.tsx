import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading delicious dishes...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-[#ff5a36] animate-spin flex items-center justify-center" />
        <span className="absolute inset-0 flex items-center justify-center text-lg">🍴</span>
      </div>
      <p className="text-slate-600 font-medium text-sm sm:text-base animate-pulse">{message}</p>
    </div>
  );
};
