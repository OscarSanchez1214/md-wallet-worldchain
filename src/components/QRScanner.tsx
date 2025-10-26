// src/components/QRScanner.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/browser";

export const QRScanner: React.FC<{ onScan: (text: string) => void }> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const start = async () => {
      try {
        codeReaderRef.current = new BrowserMultiFormatReader();
        const constraints = { video: { facingMode: "environment" } };

        if (!videoRef.current) return;
        // decodeFromConstraints empareja con el elemento video
        await codeReaderRef.current.decodeFromConstraints(constraints, videoRef.current, (result: Result | undefined, err) => {
          if (result) {
            onScan(result.getText());
          }
          // err puede ser NotFoundException repetidamente mientras busca; no lo logueamos todo
        });
      } catch (err) {
        console.error("Error iniciando scanner:", err);
      }
    };

    start();

    return () => {
      // cleanup: stop camera & reset reader
      try {
        codeReaderRef.current?.reset();
      } catch (e) {
        // ignore
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <video ref={videoRef} style={{ width: "100%", borderRadius: 8 }} />
    </div>
  );
};

export default QRScanner;
