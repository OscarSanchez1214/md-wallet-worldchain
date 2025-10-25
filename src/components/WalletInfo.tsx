"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { MD_CONTRACT, MD_ABI, getProvider } from "../lib/worldchain";

export const WalletInfo = ({ address }: { address: string }) => {
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = getProvider();
      const contract = new ethers.Contract(MD_CONTRACT, MD_ABI, provider);
      const bal = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      setBalance(ethers.formatUnits(bal, decimals));
    };
    if (address) fetchBalance();
  }, [address]);

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md mt-4 w-full text-center">
      <h2 className="text-lg font-semibold">Mi billetera</h2>
      <p className="text-sm text-gray-600">Dirección:</p>
      <p className="font-mono text-xs break-words">{address}</p>
      <h3 className="text-xl font-bold mt-2">{balance} MD</h3>
    </div>
  );
};
