import { useCallback, useEffect, useState } from 'react';
import { sprintAPI } from '../../api/scrum/sprint';
import { Sprint as SprintType } from '../../../types/scrum/sprint';

type useSprint = {
  loading: boolean;
  errorMessage: string | undefined;
  sprintData: SprintType[] | undefined;
  getSprintList: () => Promise<void>;
  createSprint: (sprintName: string, startDate: string, endDate: string) => Promise<void>;
  deleteSprint: (id: string) => Promise<void>;
  updateSprint: (id: string, sprintName: string, startDate: string, endDate: string) => Promise<void>;
}

export const useSprint = (): useSprint => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [sprintData, setSprintData] = useState<SprintType[] | undefined>(undefined);

  // スプリント一覧取得処理
  const getSprintList = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response: SprintType[] = await sprintAPI.getSprintList();
      setSprintData(response);
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
      await getSprintList(); // スプリント一覧を再取得
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [getSprintList]);

  // スプリント削除処理
  const deleteSprint = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      await sprintAPI.deleteSprint(id);
      await getSprintList(); // スプリント一覧を再取得
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [getSprintList]);

  // スプリント更新処理
  const updateSprint = useCallback(async (id: string, sprintName: string, startDate: string, endDate: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      await sprintAPI.updateSprint(id, sprintName, startDate, endDate);
      await getSprintList(); // スプリント一覧を再取得
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [getSprintList]);

  return { loading, errorMessage, getSprintList, createSprint, sprintData, deleteSprint, updateSprint };
};
