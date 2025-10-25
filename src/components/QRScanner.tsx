"use client";

import { QrReader } from "react-qr-reader";

export const QRScanner = ({ onScan }: { onScan: (address: string) => void }) => {
  const handleScan = (result: any) => {
    if (result?.text) {
      onScan(result.text);
    }
  };

  const handleError = (error: any) => {
    console.error("Error al escanear QR:", error);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Escanear QR</h3>
      <QrReader
        onResult={(result, error) => {
          if (!!result) handleScan(result);
          if (!!error) handleError(error);
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%" }}
      />
    </div>
  );
};
