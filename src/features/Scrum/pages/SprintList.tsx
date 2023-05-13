import React, { useEffect, useState } from 'react'
import { useSprint } from '../../../services/hooks/scrum/sprint/useSprint'
import { Sprint } from '../../../types/scurm/sprint';

export const SprintList: React.FC = () => {
  const { getSprints, sprints } = useSprint();

  useEffect(() => {
    getSprints();
  }, []);

  return (
    <>
      <div>SprintList</div>
      {sprints && (
        <div>
          {sprints.map((sprint: Sprint) => (
            <div key={sprint.sprintId}>
              <div>{sprint.sprintId}</div>
              <div>{sprint.name}</div>
              <div>{sprint.startDate}</div>
              <div>{sprint.updatedBy}</div>
              <div>{sprint.createdAt}</div>
              <div>{sprint.updatedAt}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
