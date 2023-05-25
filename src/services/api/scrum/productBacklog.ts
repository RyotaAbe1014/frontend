import { requireTokenApi } from "../common/requireTokenApi";
import { AxiosError, AxiosResponse } from "axios";

interface productBacklogAPI {
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
}

export const productBacklogAPI: productBacklogAPI = {
  createProductBacklog: async (title: string, description: string, sprintId: string | undefined) => {
    return await requireTokenApi.post(`/scrum/product_backlog/create/`,
      {
        title: title,
        sprintId: sprintId,
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
} 