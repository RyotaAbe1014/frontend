import React from 'react';

type PuroductBacklogContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
};

export const PuroductBacklogContext = React.createContext<PuroductBacklogContextType>({
  loading: false,
  errorMessage: undefined,
  createProductBacklog: async () => {},
});
