import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CoinPrice {
  ethereum: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    last_updated: string;
  };
  solana: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    last_updated: string;
  };
}

const CoinSelector: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<'ethereum' | 'solana'>('ethereum');
  const [price, setPrice] = useState<CoinPrice>({
    ethereum: {
      usd: 0,
      usd_24h_change: 0,
      usd_24h_vol: 0,
      last_updated: ''
    },
    solana: {
      usd: 0,
      usd_24h_change: 0,
      usd_24h_vol: 0,
      last_updated: ''
    }
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true'
        );
        setPrice({
          ethereum: {
            usd: response.data.ethereum.usd,
            usd_24h_change: response.data.ethereum.usd_24h_change,
            usd_24h_vol: response.data.ethereum.usd_24h_vol,
            last_updated: response.data.ethereum.last_updated_at
          },
          solana: {
            usd: response.data.solana.usd,
            usd_24h_change: response.data.solana.usd_24h_change,
            usd_24h_vol: response.data.solana.usd_24h_vol,
            last_updated: response.data.solana.last_updated_at
          }
        });
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(volume);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setSelectedCoin('ethereum')}
          className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
            selectedCoin === 'ethereum'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          Ethereum
        </button>
        <button
          onClick={() => setSelectedCoin('solana')}
          className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
            selectedCoin === 'solana'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          Solana
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price
          </h2>
          <span className="text-sm text-white/60">
            Updated: {formatTime(price[selectedCoin].last_updated)}
          </span>
        </div>
        
        <div className="flex items-baseline space-x-4 mb-6">
          <span className="text-4xl font-bold text-white">
            {formatPrice(price[selectedCoin].usd)}
          </span>
          <span className={`text-xl ${price[selectedCoin].usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {price[selectedCoin].usd_24h_change >= 0 ? '↑' : '↓'} {Math.abs(price[selectedCoin].usd_24h_change).toFixed(2)}%
          </span>
        </div>
        
        <div className="text-sm text-white/60">
          <span className="font-medium text-white/80">24h Volume:</span> {formatVolume(price[selectedCoin].usd_24h_vol)}
        </div>
      </div>

      {/* Send/Receive Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-base px-6 py-3 text-center transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)}</span>
        </button>
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-xl text-base px-6 py-3 text-center transition-all duration-200 shadow-lg shadow-pink-500/25 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m0 0l6-6m-6 6l6 6" />
          </svg>
          <span>Receive {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)}</span>
        </button>
      </div>
    </div>
  );
};

export default CoinSelector; 