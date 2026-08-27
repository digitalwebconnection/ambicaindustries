import { Link } from 'react-router-dom';
import { quickNavItems } from '../../data/navigation';

const LOGO = '/logo.png';

export default function ProductQuickNav() {
  return (
    <div className="bg-white shadow-sm hidden lg:block">
      <div className="max-w-[1210px] mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center gap-3">
          <img src={LOGO} alt="Ambica Industry" className="h-16 w-auto" />
          <span className="font-bold text-2xl tracking-tight text-primary-dark">Ambica Industry</span>
        </Link>

        {/* Quick Nav Links */}
        <nav className="flex items-center gap-0">
          {quickNavItems.map((item, i) => (
            <span key={item.href} className="flex items-center">
              <Link
                to={item.href}
                className="px-3 py-1 text-sm font-semibold text-primary-dark hover:text-accent-red transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-red transition-all duration-300 group-hover:w-full" />
              </Link>
              {i < quickNavItems.length - 1 && (
                <span className="t1ext-accent-red text-xs">|</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
