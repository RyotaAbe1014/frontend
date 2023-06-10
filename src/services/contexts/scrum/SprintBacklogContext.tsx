import React from 'react';

type SprintBacklogContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  createdMessage: string | undefined;
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
};

export const SprintBacklogContext = React.createContext<SprintBacklogContextType>({
  loading: false,
  errorMessage: undefined,
  createdMessage: undefined,
  createSprintBacklog: async () => { },
});
