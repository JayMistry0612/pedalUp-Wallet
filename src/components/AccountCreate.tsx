import React, { useState } from "react";
import { generateAccount } from "../wallet-utils/AccountUtils";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

interface AccountCreateProps {
  onAccountCreate: (account: { account: Account; seedPhrase: string }) => void;
}

const AccountCreate: React.FC<AccountCreateProps> = ({ onAccountCreate }) => {
  const [showInput, setShowInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState("");

  const createAccount = () => {
    const accountData = generateAccount();
    console.log("Account created!", accountData);
    onAccountCreate(accountData);
  };

  const showInputFunction = () => {
    setShowInput(true);
  };

  const handleSeedPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(e.target.value);
  };

  const handleSeedPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountData = generateAccount(seedPhrase);
    console.log("Recovery", accountData);
    onAccountCreate(accountData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <button
          onClick={createAccount}
          className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-lg px-8 py-4 text-center transition-all duration-200 shadow-lg shadow-purple-500/25"
        >
          Create New Account
        </button>
        <button
          onClick={showInputFunction}
          className="w-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-xl text-lg px-8 py-4 text-center transition-all duration-200 shadow-lg shadow-pink-500/25"
        >
          Recover Existing Account
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleSeedPhraseSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={seedPhrase}
              onChange={handleSeedPhraseChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your 12-word recovery phrase"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2 text-center transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Recover
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountCreate;
