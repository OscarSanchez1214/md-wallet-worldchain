"use client";
import { useZxing } from "react-zxing";

export const QRScanner = ({ onScan }: { onScan: (text: string) => void }) => {
  const { ref } = useZxing({ onDecodeResult(result) { onScan(result.getText()); } });
  return <video ref={ref} style={{ width: "100%" }} />;
};
