import React from 'react';
import { ProductBacklog as ProductBacklogType } from '../../../types/scrum/productBacklog';

type ProductBacklogContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  productBacklogData: ProductBacklogType[] | undefined;
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
  getProductBacklogList: () => Promise<void>;
  getProductBacklogCorrespondingList: (sprintId: string) => Promise<void>;
  deleteProductBacklog: (id: string) => Promise<void>;
  updateProductBacklog: (id: string, title: string, description: string, progress: number, sprintId: string | undefined) => Promise<void>;
};

export const ProductBacklogContext = React.createContext<ProductBacklogContextType>({
  loading: false,
  errorMessage: undefined,
  productBacklogData: undefined,
  createProductBacklog: async () => { },
  getProductBacklogList: async () => { },
  getProductBacklogCorrespondingList: async () => { },
  deleteProductBacklog: async () => { },
  updateProductBacklog: async () => { },
});