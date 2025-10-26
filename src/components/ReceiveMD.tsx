"use client";
import { useState } from "react";
import QRCode from "qrcode.react";
import { MiniKit } from "@worldcoin/minikit-js";
import { MD_TOKEN } from "../lib/config";

export function ReceiveMD() {
  const [addr, setAddr] = useState<string|null>(null);
  const grab = async () => {
    if (!MiniKit?.isInstalled?.()) { alert("Abre en World App"); return; }
    const maybe = (MiniKit as any)?.walletAddress ?? null;
    if (maybe) { setAddr(maybe); return; }
    const r = await MiniKit.commandsAsync.getAddress?.();
    setAddr(r?.finalPayload?.address ?? null);
  };
  return (
    <div>
      {!addr ? <button onClick={grab}>Mostrar mi dirección</button> :
      <>
        <div>{addr}</div>
        <QRCode value={JSON.stringify({ address: addr, token: MD_TOKEN })} size={160} />
      </>}
    </div>
  );
}
