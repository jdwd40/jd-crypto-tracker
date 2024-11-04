import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex items-center">
        <AlertCircle className="text-red-400 mr-3" size={24} />
        <div>
          <p className="text-red-700 font-medium">{message}</p>
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}