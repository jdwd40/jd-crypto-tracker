const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoPrices() {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=bitcoin,ethereum&vs_currencies=gbp&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch cryptocurrency prices');
  }
}

export async function fetchCryptoHistory(id: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}/market_chart?vs_currency=gbp&days=7&interval=daily`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch price history');
  }
}