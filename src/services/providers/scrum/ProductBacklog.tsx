import React from 'react';
import { useProductBacklog } from '../../hooks/scrum/useProductBacklog';
import { PuroductBacklogContext } from '../../contexts/scrum/PuroductBacklogContext';


export const ProductBacklogProvider = ({ children }: { children: React.ReactNode }) => {
  const productBacklogValue = useProductBacklog();

  return (
    <PuroductBacklogContext.Provider value={productBacklogValue}>
      {children}
    </PuroductBacklogContext.Provider>
  );
};
