import { SprintBacklogDTO } from "../../../types/scrum/sprintBacklog";
import { requireTokenApi } from "../common/requireTokenApi";
import { AxiosError, AxiosResponse } from "axios";

interface sprintBacklogAPI {
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
  getSprintBacklogNotCorrespondingSprintList: (productBacklogId: string | undefined) => Promise<SprintBacklogDTO[]>;
  getSprintBacklogList: (sprintId: string, productBacklogId: string | undefined) => Promise<SprintBacklogDTO[]>;
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
  },
  getSprintBacklogNotCorrespondingSprintList: async (correspondingProductBacklogId: string | undefined) => {
    return await requireTokenApi.get('/scrum/sprint_backlog_not_corresponding_sprint_list/',
      {
        params: {
          productBacklogId: correspondingProductBacklogId ? correspondingProductBacklogId : ''
        }
      })
      .then((response: AxiosResponse) => {
        return response.data as SprintBacklogDTO[];
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  },

  getSprintBacklogList: async (sprintId: string, productBacklogId: string | undefined) => {
    return await requireTokenApi.get('/scrum/sprint_backlog_list/',
      {
        params: {
          sprintId: sprintId,
          productBacklogId: productBacklogId ? productBacklogId : ''
        }
      })
      .then((response: AxiosResponse) => {
        return response.data as SprintBacklogDTO[];
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  },
};
