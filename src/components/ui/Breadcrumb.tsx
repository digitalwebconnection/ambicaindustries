import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  title: string;
  items?: { label: string; href?: string }[];
}

export default function Breadcrumb({ title, items = [] }: BreadcrumbProps) {
  return (
    <section className="relative h-37.5 sm:h-45 md:h-60 overflow-hidden flex items-center justify-center bg-primary-dark">
      {/* Background with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoom"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(6,64,140,0.9), rgba(217,23,156,0.7))',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{title}</h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-white/80">
          <Link to="/" className="hover:text-accent-gold transition-colors flex items-center gap-1">
            <Home size={14} />
            Home
          </Link>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={14} />
              {item.href ? (
                <Link to={item.href} className="hover:text-accent-gold transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-accent-gold">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
