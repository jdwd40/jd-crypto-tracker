import { useState, useEffect, useCallback } from 'react';
import { fetchCryptoPrices } from '../services/api';
import type { CryptoData } from '../types/crypto';

const CRYPTO_ICONS = {
  bitcoin: '₿',
  ethereum: 'Ξ',
};

const CRYPTO_NAMES = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
};

const POLLING_INTERVAL = 60000; // 60 seconds

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const data = await fetchCryptoPrices();
      
      const formattedPrices = Object.entries(data).map(([id, details]: [string, any]) => ({
        id,
        name: CRYPTO_NAMES[id as keyof typeof CRYPTO_NAMES],
        symbol: id.toUpperCase(),
        icon: CRYPTO_ICONS[id as keyof typeof CRYPTO_ICONS],
        price: details.gbp,
        priceChange24h: details.gbp_24h_change || 0,
        volume24h: details.gbp_24h_vol || 0,
        marketCap: details.gbp_market_cap || 0,
        sparkline: [],
      }));

      setPrices(formattedPrices);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch cryptocurrency prices. Please try again later.');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, POLLING_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    loading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
}