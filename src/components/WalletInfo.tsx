"use client";
import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { ethers } from "ethers";
import { MD_TOKEN, RPC_URL } from "../lib/config";

const MD_ABI = ["function balanceOf(address) view returns (uint256)","function decimals() view returns (uint8)","function symbol() view returns (string)"];

export function WalletInfo() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectAndRead = async () => {
    if (!MiniKit?.isInstalled?.()) { alert("Abre en World App"); return; }
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({ requestId: "auth" + Date.now(), statement: "Conectar MD Wallet" });
    if (finalPayload?.status === "success" && finalPayload.address) {
      setAddress(finalPayload.address);
      await readBalance(finalPayload.address);
    }
  };

  const readBalance = async (addr: string) => {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const c = new ethers.Contract(MD_TOKEN, MD_ABI, provider);
    const [raw, decimals, symbol] = await Promise.all([c.balanceOf(addr), c.decimals(), c.symbol()]);
    setBalance(ethers.formatUnits(raw, decimals) + " " + symbol);
  };

  useEffect(()=>{ // si MiniKit expone address ya
    const maybe = (MiniKit as any)?.walletAddress ?? null;
    if (maybe) { setAddress(maybe); readBalance(maybe); }
  },[]);

  return (
    <div>
      {!address ? <button onClick={connectAndRead}>Conectar (World App)</button> :
      <div>
        <div>{address}</div>
        <div>{balance ?? "Cargando..."}</div>
        <button onClick={() => readBalance(address)}>Refrescar</button>
      </div>}
    </div>
  );
}
