"use client";

import QrScanner from "react-qr-scanner";

export const QRScanner = ({ onScan }: { onScan: (address: string) => void }) => {
  const handleScan = (data: any) => {
    if (data && data.text) {
      onScan(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear QR:", err);
  };

  const previewStyle = {
    height: 240,
    width: "100%",
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Escanear QR</h3>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
      />
    </div>
  );
};
