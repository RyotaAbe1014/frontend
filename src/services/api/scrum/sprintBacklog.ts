import { requireTokenApi } from "../common/requireTokenApi";
import { AxiosError, AxiosResponse } from "axios";

interface sprintBacklogAPI {
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
}

export const sprintBacklogAPI: sprintBacklogAPI = {
  createSprintBacklog: async (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => {
    return await requireTokenApi.post(`/scrum/sprint_backlog/create/`,
      {
        title: title,
        sprintId: correspondingSprintId,
        productBacklogId: correspondingProductBacklogId,
        status: status,
        priority: priority,
        assignee: assignee,
        description: description
      }
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  }
};
