"use client";
import QrReader from "react-weblineindia-qr-reader";

export const QRScanner = ({ onScan }: { onScan: (address: string) => void }) => {
  const handleScan = (data: string | null) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear QR:", err);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Escanear QR</h3>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        facingMode="environment"
      />
    </div>
  );
};
