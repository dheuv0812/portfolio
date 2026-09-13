import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc = '/dhruv.jpg', alt, className, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {loading && (
        <div className="absolute inset-0 bg-black/5 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt || ''}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          if (fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        {...props}
      />
    </div>
  );
}
