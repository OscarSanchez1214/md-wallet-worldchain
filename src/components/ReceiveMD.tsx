// src/components/ReceiveMD.tsx
"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { MiniKit } from "@worldcoin/minikit-js";
import { MD_TOKEN } from "../lib/config";

export default function ReceiveMD() {
  const [addr, setAddr] = useState<string | null>(null);

  const getAddress = async () => {
    if (!MiniKit?.isInstalled?.()) {
      alert("Abre esta MiniApp desde World App para obtener la dirección.");
      return;
    }
    try {
      const r = await MiniKit.commandsAsync.getAddress?.();
      const address = r?.finalPayload?.address ?? (MiniKit as any)?.walletAddress ?? null;
      if (address) setAddr(address);
      else alert("No se pudo obtener la dirección desde MiniKit.");
    } catch (e) {
      console.error(e);
      alert("Error obteniendo dirección.");
    }
  };

  const qrValue = addr ? JSON.stringify({ address: addr, token: MD_TOKEN }) : "";

  return (
    <div className="p-3 border rounded mt-3 text-center">
      <h4 className="font-semibold">Recibir MD</h4>
      {!addr ? (
        <button onClick={getAddress} className="bg-green-600 text-white px-3 py-2 rounded mt-2">
          Mostrar mi dirección / Generar QR
        </button>
      ) : (
        <>
          <p className="font-mono text-xs break-words">{addr}</p>
          <div className="mt-3" style={{ display: "inline-block", background: "white", padding: 8 }}>
            <QRCode value={qrValue} size={180} />
          </div>
          <p className="text-sm mt-2">Escanea para enviar MD (contiene address + token)</p>
        </>
      )}
    </div>
  );
}

