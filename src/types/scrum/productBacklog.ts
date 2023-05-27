import { Sprint } from "./sprint";


export interface ProductBacklog {
  productBacklogId: string;
  name: string;
  description?: string;
  sprint?: Sprint;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}
