"use client";

import QrScanner from "react-qr-scanner-2";

export const QRScanner = ({ onScan }: { onScan: (address: string) => void }) => {
  const handleScan = (data: any) => {
    if (data && data.text) {
      onScan(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear QR:", err);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Escanear QR</h3>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
    </div>
  );
};
