import React, { useState, useEffect } from "react";
import AccountCreate from "./components/AccountCreate";
import CoinSelector from "./components/CoinSelector";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

const App: React.FC = () => {
  const [wallet, setWallet] = useState<{ account: Account; seedPhrase: string } | null>(() => {
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? JSON.parse(savedWallet) : null;
  });
  const [showWallet, setShowWallet] = useState(() => {
    return localStorage.getItem('wallet') !== null;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'token' | 'recover' | 'logout'>('main');

  const handleAccountCreate = (account: { account: Account; seedPhrase: string }) => {
    setWallet(account);
    setShowWallet(true);
    localStorage.setItem('wallet', JSON.stringify(account));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleLogout = () => {
    setWallet(null);
    setShowWallet(false);
    setCurrentPage('main');
    localStorage.removeItem('wallet');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'token':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Token Details</h2>
                <p className="text-white/80">View your wallet information and balance</p>
              </div>
              <button
                onClick={() => setCurrentPage('main')}
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Wallet Address Card */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Wallet Address</h3>
                    <p className="text-white/60 text-sm">Your unique wallet identifier</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white/5 rounded-xl p-6">
                  <p className="text-white/90 font-mono text-sm break-all flex-grow min-w-0 leading-tight">{wallet?.account.address}</p>
                  <button
                    onClick={() => copyToClipboard(wallet?.account.address || '')}
                    className="text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0 bg-white/5 p-2 rounded-lg hover:bg-white/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Balance</h3>
                    <p className="text-white/60 text-sm">Current ETH Balance</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-4xl font-bold text-white mb-2">{wallet?.account.balance} ETH</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 text-sm">↑ 2.5%</span>
                    <span className="text-white/40 text-sm">from last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Transaction History</h3>
                  <p className="text-white/60 text-sm">Your recent transactions</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-white/60 text-center">No recent transactions</p>
                  <button className="mt-4 text-white/80 hover:text-white transition-colors duration-200 text-sm">
                    View on Etherscan →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'recover':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Recover Account</h2>
                <p className="text-white/80">Your 12-word recovery phrase</p>
              </div>
              <button
                onClick={() => setCurrentPage('main')}
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Recovery Phrase</h3>
                  <p className="text-white/60 text-sm">Your 12-word secret phrase</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="text-center">
                    <p className="text-white/80 text-lg mb-2">Click below to copy your recovery phrase</p>
                    <p className="text-white/60 text-sm">Store it safely - you'll need it to recover your wallet</p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(wallet?.seedPhrase || '')}
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-base px-6 py-3 text-center transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Recovery Phrase</span>
                  </button>

                 
                </div>
              </div>
            </div>
          </div>
        );
      case 'main':
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-bold text-white">PedalUps Wallet</h1>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
                >
                  <span>Menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-2">
                    <button
                      onClick={() => {
                        setCurrentPage('token');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Token Details
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('recover');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Recover Account
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <CoinSelector walletAddress={wallet?.account.address || ''} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {!showWallet ? (
        // First Screen - Logo and Account Options
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="backdrop-blur-lg rounded-[2.5rem] shadow-2xl p-12 border border-white/20">
              <div className="flex flex-col items-center mb-20">
                <div className="relative">
                  <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">PedalUps</h1>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30"></div>
                </div>
                <p className="text-xl text-white/90 font-medium">Your Web3 Wallet Solution</p>
              </div>
              <div className="border-t border-white/10 pt-12">
                <div className="max-w-3xl mx-auto">
                  <AccountCreate onAccountCreate={handleAccountCreate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Second Screen - Wallet Information
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-[2.5rem] shadow-2xl p-12 border border-white/20">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
