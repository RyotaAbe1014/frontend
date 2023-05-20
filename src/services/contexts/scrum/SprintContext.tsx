import React from 'react';
import { Sprint as SprintType } from '../../../types/scurm/sprint';

type SprintContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  data: SprintType[] | undefined;
  getSprint: (id: string) => Promise<void>;
  getSprints: () => Promise<void>;
  createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
};

// Providing default values is important here
export const SprintContext = React.createContext<SprintContextType>({
  loading: false,
  errorMessage: undefined,
  data: undefined,
  getSprint: async () => {},
  getSprints: async () => {},
  createSprint: async () => {},
});
