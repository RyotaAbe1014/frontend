import React from 'react';
import { SprintContext } from '../../contexts/scrum/SprintContext';
import { useSprint } from '../../hooks/scrum/useSprint';

export const SprintProvider = ({ children }: { children: React.ReactNode }) => {
  const sprintValue = useSprint();

  return (
    <SprintContext.Provider value={sprintValue}>
      {children}
    </SprintContext.Provider>
  );
};
