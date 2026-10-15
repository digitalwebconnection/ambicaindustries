import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: (productContext?: string) => void;
  closeQuoteModal: () => void;
  selectedProduct: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const openQuoteModal = useCallback((productContext?: string) => {
    setSelectedProduct(productContext || null);
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        selectedProduct,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
