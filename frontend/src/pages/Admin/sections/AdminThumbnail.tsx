import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface AdminThumbnailProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function AdminThumbnail({
  src,
  alt,
  className = '',
}: AdminThumbnailProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
      >
        <ImageIcon size={20} className="text-slate-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
