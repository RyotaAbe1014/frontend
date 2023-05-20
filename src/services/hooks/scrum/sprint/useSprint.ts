import { useCallback, useEffect, useState } from 'react';
import { sprintAPI } from '../../../api/scrum/sprint/sprint';
import { Sprint as SprintType } from '../../../../types/scurm/sprint';

type useSprint = {
  loading: boolean;
  errorMessage: string | undefined;
  data: SprintType[] | undefined;
  getSprint: (id: string) => Promise<void>;
  getSprints: () => Promise<void>;
  createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
}

export const useSprint = (): useSprint => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [data, setData] = useState<SprintType[] | undefined>(undefined);

  // スプリント一覧取得処理
  const getSprints = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response: SprintType[] = await sprintAPI.getSprints();
      if (response) {
        setData(response);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // スプリント取得処理
  const getSprint = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response = await sprintAPI.getSprint(id);
      return response;
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

// スプリント作成処理
const createSprint = useCallback(async (sprintName: string, startDate: string, endDate: string) => {
  try {
    setLoading(true);
    setErrorMessage(undefined);
    await sprintAPI.createSprint(sprintName, startDate, endDate);
    await getSprints(); // スプリント一覧を再取得
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
}, [getSprints]);

  return { loading, errorMessage, getSprint, getSprints, createSprint, data };
};
