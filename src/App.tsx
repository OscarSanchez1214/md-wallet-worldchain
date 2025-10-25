import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { QrReader } from "react-qr-reader-es6";

// Dirección del contrato MD en WorldChain
const TOKEN_ADDRESS = "0x6335c1F2967A85e98cCc89dA0c87e672715284dB";
const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("-");
  const [scannedAddress, setScannedAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // 🔹 Conectar billetera (ej: World App o MetaMask)
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Instala una billetera compatible como MetaMask o World App.");
        return;
      }
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
      const accounts = await ethProvider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("Error al conectar billetera:", err);
    }
  };

  // 🔹 Consultar saldo del token MD
  const loadBalance = async () => {
    if (!provider || !walletAddress) return;
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(walletAddress);
    const symbol = await contract.symbol();
    setTokenBalance(
      `${ethers.formatUnits(balance, decimals)} ${symbol}`
    );
  };

  useEffect(() => {
    if (provider && walletAddress) loadBalance();
  }, [provider, walletAddress]);

  // 🔹 Escaneo de código QR
  const handleScan = (result: any) => {
    if (result?.text) {
      setScannedAddress(result.text);
    }
  };

  return (
    <div className="app-container" style={{ padding: "1rem", textAlign: "center" }}>
      <h1>💠 MD Wallet WorldChain</h1>

      {!walletAddress ? (
        <button onClick={connectWallet} className="btn">
          🔗 Conectar billetera
        </button>
      ) : (
        <>
          <p><strong>Tu dirección:</strong><br />{walletAddress}</p>
          <p><strong>Saldo MD:</strong> {tokenBalance}</p>

          <button onClick={loadBalance} className="btn">🔄 Actualizar saldo</button>

          <hr style={{ margin: "2rem 0" }} />

          <h3>📷 Escanear QR para enviar tokens</h3>
          <div style={{ width: "250px", margin: "auto" }}>
            <QrReader
              onResult={(result, error) => {
                if (result) handleScan(result);
                if (error) console.warn(error);
              }}
              constraints={{ facingMode: "environment" }}
            />
          </div>

          {scannedAddress && (
            <div style={{ marginTop: "1rem" }}>
              <p>Dirección escaneada:</p>
              <code>{scannedAddress}</code>
              <button
                className="btn"
                style={{ marginTop: "0.5rem" }}
                onClick={() => alert(`Simular envío de tokens a ${scannedAddress}`)}
              >
                🚀 Enviar tokens
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
