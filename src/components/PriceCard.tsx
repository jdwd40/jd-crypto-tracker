import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { CryptoData } from '../types/crypto';

interface PriceCardProps {
  crypto: CryptoData;
}

export function PriceCard({ crypto }: PriceCardProps) {
  const isPositive = crypto.priceChange24h >= 0;
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(crypto.price);

  const formattedMarketCap = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(crypto.marketCap);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{crypto.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{crypto.name}</h2>
            <p className="text-sm text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          <span className="ml-1 font-semibold">
            {Math.abs(crypto.priceChange24h).toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">{formattedPrice}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-semibold text-gray-800">{formattedMarketCap}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">24h Volume</p>
            <p className="font-semibold text-gray-800">
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(crypto.volume24h)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}