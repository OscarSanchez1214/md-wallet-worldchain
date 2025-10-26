"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

interface SendMDProps {
  walletAddress: string;
  signer: ethers.Signer | null;
  tokenAddress: string;
}

export const SendMD: React.FC<SendMDProps> = ({ walletAddress, signer, tokenAddress }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendTokens = async () => {
    if (!signer) return alert("Conecta tu billetera primero.");
    try {
      setStatus("Enviando...");
      const erc20 = new ethers.Contract(
        tokenAddress,
        ["function transfer(address to, uint amount) returns (bool)"],
        signer
      );

      const decimals = 18;
      const tx = await erc20.transfer(to, ethers.parseUnits(amount, decimals));
      await tx.wait();
      setStatus("✅ Transacción completada.");
    } catch (error: any) {
      console.error(error);
      setStatus("❌ Error al enviar.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Enviar MD</h2>
      <input
        type="text"
        placeholder="Dirección destino"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Cantidad MD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded p-2"
      />
      <button onClick={sendTokens} className="bg-blue-600 text-white p-2 rounded">
        Enviar
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};
