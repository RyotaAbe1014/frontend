import { requireTokenApi } from "../common/requireTokenApi";
import { AxiosError, AxiosResponse } from "axios";

import { Sprint } from "../../../types/scurm/sprint";

interface sprintAPI {
    getSprints: () => Promise<Sprint[]>;
    createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
    deleteSprint: (id: string) => Promise<void>;
    updateSprint: (id: string, sprintName: string, startDate: string, endDate: string) => Promise<void>;
}

export const sprintAPI: sprintAPI = {
    getSprints: async () => {
        return await requireTokenApi.get(`/scrum/sprints/`)
            .then((response: AxiosResponse) => {
                return response.data as Sprint[];
            })
            .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
            });
    },
    createSprint: async (sprintName: string, startDate: string, endDate: string) => {
        return await requireTokenApi.post(`/scrum/sprint/create/`,
            {
                name: sprintName,
                startDate: startDate,
                endDate: endDate
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
    deleteSprint: async (id: string) => {
        return await requireTokenApi.delete(`/scrum/sprint/delete/${id}/`)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
            });
    },
    updateSprint : async (id: string, sprintName: string, startDate: string, endDate: string) => {
        return await requireTokenApi.put(`/scrum/sprint/update/${id}/`,
            {
                name: sprintName,
                startDate: startDate,
                endDate: endDate
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
} 