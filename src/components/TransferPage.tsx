import React, { useState } from 'react';

interface TransferPageProps {
  onBack: () => void;
  coinType: 'ethereum' | 'solana';
}

const TransferPage: React.FC<TransferPageProps> = ({ onBack, coinType }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Send {coinType.charAt(0).toUpperCase() + coinType.slice(1)}</h2>
          <p className="text-white/80">Transfer your tokens securely</p>
        </div>
        <button
          onClick={onBack}
          className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient's wallet address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200"
              />
              <span className="absolute right-4 top-3 text-white/40">{coinType.toUpperCase()}</span>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-base px-6 py-3 text-center transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send {coinType.charAt(0).toUpperCase() + coinType.slice(1)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPage; 