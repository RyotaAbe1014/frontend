import { UniqueIdentifier } from "@dnd-kit/core";
import { ProductBacklog } from "./productBacklog";
import { Sprint } from "./sprint";


export interface SprintBacklog {
  sprintBacklogId: string | UniqueIdentifier;
  title: string;
  description?: string;
  progress: number;
  sprint?: Sprint;
  productBacklog?: ProductBacklog;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface SprintBacklogDTO {
  sprintBacklogId: string | UniqueIdentifier;
  productBacklogId?: string;
  productBacklogTitle?: string;
  sprintId?: string;
  title: string;
  description?: string;
  status: number;
  priority: number;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}
