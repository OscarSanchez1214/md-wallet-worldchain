"use client";
import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { MD_TOKEN } from "../lib/config";
import { parseUnits } from "ethers";

export function SendMD({ defaultTo }: { defaultTo?: string }) {
  const [to, setTo] = useState(defaultTo || "");
  const [amount, setAmount] = useState("0.1");

  const send = async () => {
    if (!MiniKit?.isInstalled?.()) { alert("Abre en World App"); return; }
    const tokenAmount = parseUnits(amount, 18).toString(); // cambiar decimals si no son 18
    const payload = {
      reference: "pay-" + Date.now(),
      to,
      tokens: [{ symbol: "MD", token_address: MD_TOKEN, token_amount: tokenAmount }],
      description: `Enviar ${amount} MD`
    };
    const res = await MiniKit.commandsAsync.pay(payload);
    if (res?.finalPayload?.status === "success") alert("Enviado");
  };

  return (
    <div>
      <input value={to} onChange={e=>setTo(e.target.value)} placeholder="Dirección" />
      <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Cantidad" />
      <button onClick={send}>Enviar</button>
    </div>
  );
}

