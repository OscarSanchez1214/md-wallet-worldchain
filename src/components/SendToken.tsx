"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { MD_CONTRACT, MD_ABI } from "../lib/worldchain";

export const SendToken = ({ signer }: { signer: ethers.Signer }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const send = async () => {
    const contract = new ethers.Contract(MD_CONTRACT, MD_ABI, signer);
    const decimals = await contract.decimals();
    const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
    await tx.wait();
    alert("✅ Enviado con éxito");
  };

  return (
    <div className="flex flex-col gap-2 mt-6">
      <h3 className="font-semibold">Enviar MD</h3>
      <input
        className="border p-2 rounded"
        placeholder="Dirección destino"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="Cantidad"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={send}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
    </div>
  );
};
