import { useCallback, useEffect, useState } from 'react';
import { sprintBacklogAPI } from '../../api/scrum/sprintBacklog';


type useSprintBacklog = {
  loading: boolean;
  errorMessage: string | undefined;
  createdMessage: string | undefined;
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
}
export const useSprintBacklog = (): useSprintBacklog => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [createdMessage, setCreatedMessage] = useState<string | undefined>(undefined);

  const createSprintBacklog = useCallback(async (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      setCreatedMessage(undefined);
      await sprintBacklogAPI.createSprintBacklog(title, correspondingSprintId, correspondingProductBacklogId, status, priority, assignee, description);
      setCreatedMessage('新規スプリントバックログアイテムを作成しました。');
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, errorMessage, createSprintBacklog, createdMessage };
};
