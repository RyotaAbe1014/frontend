import { useCallback, useEffect, useState } from 'react';
import { sprintBacklogAPI } from '../../api/scrum/sprintBacklog';
import { SprintBacklogDTO } from '../../../types/scrum/sprintBacklog';


type useSprintBacklog = {
  loading: boolean;
  errorMessage: string | undefined;
  isCreated: boolean;
  sprintBacklogData: { [key: string]: SprintBacklogDTO[]; };
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
  getSprintBacklogNotCorrespondingSprintList: () => Promise<void>;
}
export const useSprintBacklog = (): useSprintBacklog => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [sprintBacklogData, setSprintBacklogData] = useState<{ [key: string]: SprintBacklogDTO[]; }>({
    notStarted: [],
    inProgress: [],
    review: [],
    done: [],
  });

  const createSprintBacklog = useCallback(async (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      await sprintBacklogAPI.createSprintBacklog(title, correspondingSprintId, correspondingProductBacklogId, status, priority, assignee, description);
      setIsCreated(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // スプリントに紐づいていないスプリントバックログを取得
  const getSprintBacklogNotCorrespondingSprintList = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      // TODO: ここでAPIを叩く
      // const response = await sprintBacklogAPI.getSprintBacklogNotCorrespondingSprintList();

      // TODO: ここでAPIのレスポンスを整形する
      // 整形する際はforeachで回して、sprintBacklogのstatusの値を確認し、それぞれの配列に振り分ける
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, errorMessage, isCreated, sprintBacklogData, createSprintBacklog, getSprintBacklogNotCorrespondingSprintList };
};
