import { baseAPI } from "../../common/baseApi";
import { AxiosError, AxiosResponse } from "axios";

import { Sprint } from "../../../../types/scurm/sprint";

interface sprintAPI {
    getSprint: (id: string) => Promise<void>;
    getSprints: () => Promise<Sprint[]>;
    createSprint: (data: any) => Promise<void>;
}

export const sprintAPI: sprintAPI = {
    getSprint: async (id: string) => {
        return await baseAPI.get(`/sprint/${id}`)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
            });
    },
    getSprints: async () => {
        return await baseAPI.get(`/scrum/sprints/`)
            .then((response: AxiosResponse) => {
                return response.data as Sprint[];
            })
            .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
            });
    },
    createSprint: async (data: any) => {
        return await baseAPI.post(`/sprint/`, data)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
            });
    }
} 