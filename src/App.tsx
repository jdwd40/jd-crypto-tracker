import React from 'react';
import { useCryptoPrices } from './hooks/useCryptoPrices';
import { PriceCard } from './components/PriceCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RefreshCw } from 'lucide-react';

function App() {
  const { prices, loading, error, lastUpdated } = useCryptoPrices();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">JD-CryptoTracker</h1>
            {lastUpdated && (
              <div className="flex items-center text-sm text-gray-500">
                <RefreshCw size={16} className="mr-2" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {prices.map((crypto) => (
              <PriceCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;