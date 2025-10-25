"use client";
import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { WalletInfo } from "./components/WalletInfo";
import { SendToken } from "./components/SendToken";
import { QRScanner } from "./components/QRScanner";
import { ethers } from "ethers";

export default function App() {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    if (MiniKit.isInstalled()) {
      MiniKit.commandsAsync.getAddress().then((res) => {
        setAddress(res.finalPayload.address);
        setSigner(new ethers.BrowserProvider(window.ethereum).getSigner());
      });
    } else {
      alert("Abre esta MiniApp dentro de World App");
    }
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold">MD Wallet - WorldChain</h1>
      {address && <WalletInfo address={address} />}
      {signer && <SendToken signer={signer} />}
      <QRScanner onScan={(addr) => setAddress(addr)} />
    </div>
  );
}
