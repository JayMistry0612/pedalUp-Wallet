import React from "react";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

interface AccountDetailsProps {
  account: Account;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Account Details</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="mb-2">
          <span className="font-medium">Address:</span>
          <span className="ml-2 text-gray-600">{account.address}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Balance:</span>
          <span className="ml-2 text-gray-600">{account.balance} ETH</span>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Note: Keep your private key and seed phrase secure!
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
