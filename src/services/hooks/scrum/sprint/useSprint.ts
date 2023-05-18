import { useCallback, useState } from 'react';
import { sprintAPI } from '../../../api/scrum/sprint/sprint';
import { Sprint as SprintType } from '../../../../types/scurm/sprint';

type useSprint = {
  loading: boolean;
  errorMessage: string | undefined;
  sprints: SprintType[] | undefined;
  getSprint: (id: string) => Promise<void>;
  getSprints: () => Promise<void>;
  createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
}

export const useSprint = (): useSprint => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [sprints, setSprints] = useState<SprintType[] | undefined>(undefined);


  // スプリント取得処理
  const getSprint = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response = await sprintAPI.getSprint(id);
      setLoading(false);
      return response;
    }
    catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }, []);

  // スプリント一覧取得処理
  const getSprints = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response: SprintType[] = await sprintAPI.getSprints();
      if (response) {
        setSprints(response);
      }
      setLoading(false);
    }
    catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }, []);

  // スプリント作成処理
  const createSprint = useCallback(async (sprintName: string, startDate: string, endDate: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);      
      await sprintAPI.createSprint(sprintName, startDate, endDate);
      // スプリント一覧を再取得
      await getSprints();
      setLoading(false);
    }
    catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }, []);

  return { loading, errorMessage, getSprint, getSprints, createSprint, sprints };
}