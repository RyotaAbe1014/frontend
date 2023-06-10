import React from 'react';
import { useSprintBacklog } from '../../hooks/scrum/useSprintBacklog';
import { SprintBacklogContext } from '../../contexts/scrum/SprintBacklogContext';


export const SprintBacklogProvider = ({ children }: { children: React.ReactNode }) => {
  const sprintBacklogValue = useSprintBacklog();

  return (
    <SprintBacklogContext.Provider value={sprintBacklogValue}>
      {children}
    </SprintBacklogContext.Provider>
  );
};
