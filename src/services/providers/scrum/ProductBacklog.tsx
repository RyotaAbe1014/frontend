import React from 'react';
import { useProductBacklog } from '../../hooks/scrum/useProductBacklog';
import { ProductBacklogContext } from '../../contexts/scrum/ProductBacklogContext';


export const ProductBacklogProvider = ({ children }: { children: React.ReactNode }) => {
  const productBacklogValue = useProductBacklog();

  return (
    <ProductBacklogContext.Provider value={productBacklogValue}>
      {children}
    </ProductBacklogContext.Provider>
  );
};
