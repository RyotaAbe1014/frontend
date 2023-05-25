import { useCallback, useEffect, useState } from 'react';
import { productBacklogAPI } from '../../api/scrum/productBacklog';

type useProductBacklog = {
  loading: boolean;
  errorMessage: string | undefined;
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
}

export const useProductBacklog = (): useProductBacklog => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // バックログアイテム作成処理
  const createProductBacklog = useCallback(async (title: string, description: string, sprintId: string | undefined) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      await productBacklogAPI.createProductBacklog(title, description, sprintId);
      // await getSprints(); // スプリント一覧を再取得
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, errorMessage, createProductBacklog };
};
