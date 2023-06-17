import React from 'react';
import { SprintBacklogDTO } from '../../../types/scrum/sprintBacklog';
import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

type SprintBacklogContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  isCreated: boolean;
  sprintBacklogData: { [key: string]: SprintBacklogDTO[]; };
  removeAllSprintBacklogState: () => void;
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
  getSprintBacklogNotCorrespondingSprintList: (correspondingProductBacklogId: string | undefined) => Promise<void>;
  getSprintBacklogList: (sprintId: string, correspondingProductBacklogId: string | undefined) => Promise<void>;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  activeId: UniqueIdentifier | undefined;
  sprintBacklog: SprintBacklogDTO | undefined;
};

export const SprintBacklogContext = React.createContext<SprintBacklogContextType>({
  loading: false,
  errorMessage: undefined,
  isCreated: false,
  sprintBacklogData: {},
  removeAllSprintBacklogState: () => { },
  createSprintBacklog: async () => { },
  getSprintBacklogNotCorrespondingSprintList: async () => { },
  getSprintBacklogList: async () => { },
  handleDragOver: () => { },
  handleDragStart: () => { },
  handleDragEnd: () => { },
  activeId: undefined,
  sprintBacklog: undefined,
});
