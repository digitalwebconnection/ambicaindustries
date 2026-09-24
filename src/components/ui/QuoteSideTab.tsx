import { useState, useEffect } from 'react';
import QuoteModal from './QuoteModal';

export default function  QuoteSideTab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setOpen(true);
    window.addEventListener('openQuoteModal', handleOpenModal);
    return () => window.removeEventListener('openQuoteModal', handleOpenModal);
  }, []);

  return (
    <>
      {/* Side Tab — no entrance animation, just a static positioned element */}
      <button
        onClick={() => setOpen(true)}
        className="fixed cursor-pointer right-0 top-1/2 -translate-y-1/2 z-40 bg-accent-red hover:bg-accent-red-dark text-white text-xs font-bold py-6 px-3 rounded-l-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:pr-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Request A Quote"
      >
        Request A Quote
      </button>

      {/* Modal */}
      {open && <QuoteModal onClose={() => setOpen(false)} />}
    </>
  );
}
