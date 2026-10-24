import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  activeImage?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName, activeImage }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  React.useEffect(() => {
    if (activeImage) {
      const idx = images.indexOf(activeImage);
      if (idx !== -1) {
        setSelectedIndex(idx);
      }
    }
  }, [activeImage, images]);

  const currentImage = images[selectedIndex] || images[0];

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square rounded-3xl bg-ivory-100 border border-charcoal-200/80 overflow-hidden flex items-center justify-center p-8 shadow-sm">
        <img
          src={currentImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="w-full h-full object-contain transition-all duration-300"
          width="600"
          height="600"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-charcoal-800 hover:bg-forest-900 hover:text-white shadow-md transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-charcoal-800 hover:bg-forest-900 hover:text-white shadow-md transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 justify-center" role="tablist">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === selectedIndex}
              onClick={() => setSelectedIndex(idx)}
              className={`w-20 h-20 rounded-2xl p-2 bg-ivory-50 border-2 transition-all shrink-0 overflow-hidden ${
                idx === selectedIndex
                  ? 'border-forest-900 ring-2 ring-gold-400 shadow-md'
                  : 'border-charcoal-200 opacity-70 hover:opacity-100 hover:border-charcoal-400'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
                width="80"
                height="80"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
