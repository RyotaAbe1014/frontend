import { ProductBacklog as ProductBacklogType } from './../../../types/scrum/productBacklog';
import { useCallback, useEffect, useState } from 'react';
import { productBacklogAPI } from '../../api/scrum/productBacklog';

type useProductBacklog = {
  loading: boolean;
  errorMessage: string | undefined;
  productBacklogData: ProductBacklogType[] | undefined;
  createProductBacklog: (title: string, description: string, sprintId: string | undefined) => Promise<void>;
  getProductBacklogList: () => Promise<void>;
}

export const useProductBacklog = (): useProductBacklog => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [productBacklogData, setProductBacklogData] = useState<ProductBacklogType[] | undefined>(undefined);

    // バックログアイテム一覧取得処理
    const getProductBacklogList = useCallback(async () => {
      try {
        setLoading(true);
        setErrorMessage(undefined);
        const response: ProductBacklogType[] = await productBacklogAPI.getProductBacklogList();
        if (response) {
          setProductBacklogData(response);
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }, []);
    
  // バックログアイテム作成処理
  const createProductBacklog = useCallback(async (title: string, description: string, sprintId: string | undefined) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      await productBacklogAPI.createProductBacklog(title, description, sprintId);
      await getProductBacklogList();
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [getProductBacklogList]);


  return { loading, errorMessage, createProductBacklog, productBacklogData, getProductBacklogList };
};
