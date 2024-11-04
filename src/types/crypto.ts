export interface CryptoPrice {
  gbp: number;
  gbp_24h_change: number;
  gbp_24h_vol: number;
  gbp_market_cap: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
}

export interface MarketData {
  prices: [number, number][];
}