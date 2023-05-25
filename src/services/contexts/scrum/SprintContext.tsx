import React from 'react';
import { Sprint as SprintType } from '../../../types/scurm/sprint';

type SprintContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  sprintData: SprintType[] | undefined;
  getSprintList: () => Promise<void>;
  createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
  deleteSprint: (id: string) => Promise<void>;
  updateSprint: (id: string, sprintName: string, startDate: string, endDate: string) => Promise<void>;
};

export const SprintContext = React.createContext<SprintContextType>({
  loading: false,
  errorMessage: undefined,
  sprintData: undefined,
  getSprintList: async () => {},
  createSprint: async () => {},
  deleteSprint: async () => {},
  updateSprint: async () => {},
});
