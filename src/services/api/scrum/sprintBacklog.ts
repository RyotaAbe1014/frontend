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
    const params = new URLSearchParams();
    if (correspondingProductBacklogId && correspondingProductBacklogId !== 'noCorrespondingSprint') {
      params.append('product_backlog_id', correspondingProductBacklogId);
    }
    return await requireTokenApi.get('/scrum/sprint_backlog_not_corresponding_sprint_list/',
      {
        params: params
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
    console.log('sprintId: ' + sprintId);
    console.log('productBacklogId: ' + productBacklogId);
    const params = new URLSearchParams();
    params.append('sprint_id', sprintId);
    if (productBacklogId && productBacklogId !== 'noCorrespondingSprint') {
      params.append('product_backlog_id', productBacklogId);
    }

    return await requireTokenApi.get('/scrum/sprint_backlog_list/', {
      params: params
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
