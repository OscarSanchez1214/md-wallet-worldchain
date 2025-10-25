"use client";
import { QrReader } from "react-qr-reader";

export const QRScanner = ({ onScan }: { onScan: (address: string) => void }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Escanear QR</h3>
      <QrReader
        onResult={(result) => {
          if (result?.text) {
            onScan(result.text);
          }
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%" }}
      />
    </div>
  );
};
