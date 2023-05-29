import { requireTokenApi } from "../common/requireTokenApi";
import { AxiosError, AxiosResponse } from "axios";

import { ProductBacklog } from './../../../types/scrum/productBacklog';

interface productBacklogAPI {
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
  getProductBacklogList: () => Promise<ProductBacklog[]>;
  deleteProductBacklog: (id: string) => Promise<void>;
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
  getProductBacklogList: async () => {
    return await requireTokenApi.get(`/scrum/product_backlog_list/`)
      .then((response: AxiosResponse) => {
        return response.data as ProductBacklog[];
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  },
  deleteProductBacklog: async (id: string) => {
    return await requireTokenApi.delete(`/scrum/product_backlog/delete/${id}/`)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  }
};
