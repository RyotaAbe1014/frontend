import { Sprint } from "./sprint";


export interface ProductBacklog {
  productBacklogId: string;
  title: string;
  description?: string;
  progress: number;
  sprint?: Sprint;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}
