import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import type { Product } from '../types';

interface ProductScannerProps {
  onScan: (product: Product) => void;
}

export default function ProductScanner({ onScan }: ProductScannerProps) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    if (isActive) {
      startCamera();
    }

    // Auto-shutdown after 30 seconds of inactivity
    const checkActivity = setInterval(() => {
      if (Date.now() - lastActivity > 30000 && isActive) {
        setIsActive(false);
      }
    }, 5000);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      clearInterval(checkActivity);
    };
  }, [isActive, lastActivity]);

  const handleScan = () => {
    setLastActivity(Date.now());
    // Simulate scanning a product
    const mockProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Product",
      brand: "Test Brand",
      price: 999.99,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      count: 10,
      category: "Electronics",
      expectedLifeSpan: 365,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    };
    onScan(mockProduct);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Camera className="w-6 h-6" />
          Product Scanner
        </h2>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-lg ${
            isActive ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {isActive ? 'Stop Scanner' : 'Start Scanner'}
        </button>
      </div>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {isActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleScan}
              className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Scan Product
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Scanner Inactive
          </div>
        )}
      </div>
    </div>
  );
}