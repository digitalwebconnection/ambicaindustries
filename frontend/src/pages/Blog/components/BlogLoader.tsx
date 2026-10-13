import { RefreshCw } from 'lucide-react';

interface BlogLoaderProps {
  className?: string;
  size?: number;
}

export default function BlogLoader({ className = '', size = 42 }: BlogLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-24 sm:py-32 ${className}`}>
      <RefreshCw
        size={size}
        className="animate-spin text-slate-400"
      />
    </div>
  );
}
