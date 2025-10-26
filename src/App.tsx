"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import QRScanner from "./components/QRScanner";
import { ReceiveMD } from "./components/ReceiveMD";
import { SendMD } from "./components/SendMD";

const TOKEN_MD = "0x6335c1F2967A85e98cCc89dA0c87e672715284dB";

export default function App() {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Instala una billetera como World App o MetaMask.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setSigner(signer);
    setAddress(accounts[0]);
  };

  const fetchBalance = async () => {
    if (!signer) return;
    try {
      const erc20 = new ethers.Contract(TOKEN_MD, ["function balanceOf(address) view returns (uint256)"], signer);
      const raw = await erc20.balanceOf(address);
      setBalance(ethers.formatUnits(raw, 18));
    } catch (e) {
      console.error("Error obteniendo balance:", e);
    }
  };

  useEffect(() => {
    if (address && signer) fetchBalance();
  }, [address, signer]);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">MD Wallet - WorldChain</h1>

      {!address ? (
        <button onClick={connectWallet} className="bg-green-600 text-white px-4 py-2 rounded">
          Conectar Billetera
        </button>
      ) : (
        <>
          <p className="text-sm break-words">Conectado: {address}</p>
          <h3 className="text-lg font-semibold">Saldo: {balance} MD</h3>
          <ReceiveMD walletAddress={address} />
          <SendMD walletAddress={address} signer={signer} tokenAddress={TOKEN_MD} />
          <QRScanner onScan={(data) => alert(`QR detectado: ${data}`)} />
        </>
      )}
    </div>
  );
}
