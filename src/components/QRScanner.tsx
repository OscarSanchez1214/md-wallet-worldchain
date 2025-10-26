"use client";

import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/browser";

export const QRScanner: React.FC<{ onScan: (text: string) => void }> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const start = async () => {
      try {
        readerRef.current = new BrowserMultiFormatReader();
        if (!videoRef.current) return;

        await readerRef.current.decodeFromConstraints(
          { video: { facingMode: "environment" } },
          videoRef.current,
          (result: Result | undefined) => {
            if (result) onScan(result.getText());
          }
        );
      } catch (err) {
        console.error("Error al iniciar el lector QR:", err);
      }
    };

    start();

    return () => {
      try {
        readerRef.current?.reset();
      } catch {}
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onScan]);

  return <video ref={videoRef} style={{ width: "100%", borderRadius: 8 }} />;
};

export default QRScanner;
