"use client";
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    let html5QrCode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("reader");
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (html5QrCode) {
              html5QrCode.stop().then(() => {
                onScanSuccess(decodedText);
              }).catch(err => console.error("Failed to stop scanner", err));
            }
          },
          (errorMessage) => {
          }
        );
      } catch (err) {
        console.error("Error starting scanner", err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-300 p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md relative p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors z-20 bg-white rounded-full p-1"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-center mb-6 text-slate-700">Skieruj aparat na nakrętkę</h3>
        
        <div className="relative w-full rounded-xl overflow-hidden bg-black/5 flex items-center justify-center min-h-[300px] border-4 border-dashed border-cyan-100">
          <div id="reader" className="w-full h-full" ref={scannerRef}></div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Zeskanuj kod QR, a miasto automatycznie rozpocznie odbudowę!
        </p>
      </div>
    </div>
  );
}
