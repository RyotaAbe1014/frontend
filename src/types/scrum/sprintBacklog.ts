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
