// src/components/ReceiveMD.tsx
"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { MiniKit } from "@worldcoin/minikit-js";
import { MD_TOKEN } from "../lib/config";

export default function ReceiveMD() {
  const [addr, setAddr] = useState<string | null>(null);

  const getAddress = async () => {
    if (!MiniKit?.isInstalled?.()) {
      alert("Abre esta MiniApp desde World App");
      return;
    }
    try {
      const r = await MiniKit.commandsAsync.getAddress?.();
      const address = r?.finalPayload?.address ?? (MiniKit as any)?.walletAddress ?? null;
      if (address) setAddr(address);
    } catch (e) {
      console.error(e);
      alert("Error obteniendo dirección");
    }
  };

  const qrValue = addr ? JSON.stringify({ address: addr, token: MD_TOKEN }) : "";

  return (
    <div>
      {!addr ? <button onClick={getAddress}>Mostrar mi dirección / Generar QR</button> : (
        <>
          <p>{addr}</p>
          <div style={{ background: "white", padding: 8, display: "inline-block" }}>
            <QRCode value={qrValue} size={180} />
          </div>
        </>
      )}
    </div>
  );
}
