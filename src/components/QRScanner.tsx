"use client";
import { useZxing } from "react-zxing";

export const QRScanner = ({ onScan }: { onScan: (data: string) => void }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
    },
  });

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Escanear código QR</h3>
      <video ref={ref} style={{ width: "100%", borderRadius: "12px" }} />
    </div>
  );
};
