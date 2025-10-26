"use client";

import React from "react";
import QRCode from "react-qr-code";

interface ReceiveMDProps {
  walletAddress: string;
}

export const ReceiveMD: React.FC<ReceiveMDProps> = ({ walletAddress }) => {
  if (!walletAddress) return <p>Conecta tu billetera para recibir MD.</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Recibir MD</h2>
      <QRCode value={walletAddress} size={180} />
      <p className="text-sm break-words text-center">{walletAddress}</p>
    </div>
  );
};

