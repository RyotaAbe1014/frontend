import { useCallback, useEffect, useState } from 'react';
import { sprintBacklogAPI } from '../../api/scrum/sprintBacklog';
import { SprintBacklogDTO } from '../../../types/scrum/sprintBacklog';
import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


type useSprintBacklog = {
  loading: boolean;
  errorMessage: string | undefined;
  isCreated: boolean;
  sprintBacklogData: { [key: string]: SprintBacklogDTO[]; };
  removeAllSprintBacklogState: () => void;
  createSprintBacklog: (title: string, correspondingSprintId: string | undefined, correspondingProductBacklogId: string | undefined, status: number, priority: number, assignee: string | undefined, description: string) => Promise<void>;
  getSprintBacklogNotCorrespondingSprintList: () => Promise<void>;
  getSprintBacklogList: (sprintId: string) => Promise<void>;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  activeId: UniqueIdentifier | undefined;
  sprintBacklog: SprintBacklogDTO | undefined;
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
  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [sprintBacklog, setSprintBacklog] = useState<SprintBacklogDTO | undefined>(undefined);


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
      const response: SprintBacklogDTO[] = await sprintBacklogAPI.getSprintBacklogNotCorrespondingSprintList();

      // 整形する際はforeachで回して、sprintBacklogのstatusの値を確認し、それぞれの配列に振り分ける
      response.forEach((sprintBacklog: SprintBacklogDTO) => {
        if (sprintBacklog.status === 0) {
          setSprintBacklogData(prevData => ({ notStarted: [...prevData.notStarted, sprintBacklog], inProgress: prevData.inProgress, review: prevData.review, done: prevData.done }));
        }
        if (sprintBacklog.status === 1) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: [...prevData.inProgress, sprintBacklog], review: prevData.review, done: prevData.done }));
        }
        if (sprintBacklog.status === 2) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: prevData.inProgress, review: [...prevData.review, sprintBacklog], done: prevData.done }));
        }
        if (sprintBacklog.status === 3) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: prevData.inProgress, review: prevData.review, done: [...prevData.done, sprintBacklog] }));
        }
      });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 紐づいているスプリントバックログを取得
  const getSprintBacklogList = useCallback(async (sprintId: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      // TODO: ここでAPIを叩く
      const response: SprintBacklogDTO[] = await sprintBacklogAPI.getSprintBacklogList(sprintId);

      // 整形する際はforeachで回して、sprintBacklogのstatusの値を確認し、それぞれの配列に振り分ける
      response.forEach((sprintBacklog: SprintBacklogDTO) => {
        if (sprintBacklog.status === 0) {
          setSprintBacklogData(prevData => ({ notStarted: [...prevData.notStarted, sprintBacklog], inProgress: prevData.inProgress, review: prevData.review, done: prevData.done }));
        }
        if (sprintBacklog.status === 1) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: [...prevData.inProgress, sprintBacklog], review: prevData.review, done: prevData.done }));
        }
        if (sprintBacklog.status === 2) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: prevData.inProgress, review: [...prevData.review, sprintBacklog], done: prevData.done }));
        }
        if (sprintBacklog.status === 3) {
          setSprintBacklogData(prevData => ({ notStarted: prevData.notStarted, inProgress: prevData.inProgress, review: prevData.review, done: [...prevData.done, sprintBacklog] }));
        }
      });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAllSprintBacklogState = useCallback(() => {
    setSprintBacklogData({
      notStarted: [],
      inProgress: [],
      review: [],
      done: [],
    });
  }, []);

  //各コンテナ取得関数
  const findContainer = (id: UniqueIdentifier) => {
    if (id in sprintBacklogData) {
      return id;
    }
    return Object.keys(sprintBacklogData).find((key: string) =>
      sprintBacklogData[key].some(item => item.sprintBacklogId === id.toString())
    );
  };

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setSprintBacklogData((prev) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer];
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer];

      // 配列のインデックス取得
      const activeIndex = activeItems.findIndex(item => item.sprintBacklogId === id);
      const overIndex = overItems.findIndex(item => item.sprintBacklogId === overId.toString());

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.sprintBacklogId !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          sprintBacklogData[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id.toString();
    setActiveId(id);

    const containerKey = findContainer(id);

    if (containerKey !== undefined) {
      const item = sprintBacklogData[containerKey].find(item => item.sprintBacklogId === id);
      setSprintBacklog(item);
    }
  };

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    // 配列のインデックス取得
    const activeIndex = sprintBacklogData[activeContainer].findIndex(item => item.sprintBacklogId === id);
    const overIndex = sprintBacklogData[overContainer].findIndex(item => item.sprintBacklogId === overId.toString());

    if (activeIndex !== overIndex) {
      setSprintBacklogData((prev) => {
        // コピーを作成する
        const newSprintBacklogData = { ...prev };

        // 適切なアイテムを見つけて更新する
        const itemToUpdate = newSprintBacklogData[activeContainer][activeIndex];
        itemToUpdate.sprintBacklogId = id;
        itemToUpdate.productBacklogId = sprintBacklogData[activeContainer][activeIndex].productBacklogId || undefined;
        itemToUpdate.productBacklogTitle = sprintBacklogData[activeContainer][activeIndex].productBacklogTitle || undefined;
        itemToUpdate.sprintId = sprintBacklogData[activeContainer][activeIndex].sprintId || undefined;
        itemToUpdate.title = sprintBacklogData[activeContainer][activeIndex].title;
        itemToUpdate.description = sprintBacklogData[activeContainer][activeIndex].description || undefined;
        itemToUpdate.status = sprintBacklogData[activeContainer][activeIndex].status;
        itemToUpdate.priority = sprintBacklogData[activeContainer][activeIndex].priority;
        itemToUpdate.updatedBy = sprintBacklogData[activeContainer][activeIndex].updatedBy;
        itemToUpdate.updatedAt = sprintBacklogData[activeContainer][activeIndex].updatedAt;

        return newSprintBacklogData;
      });
    }
    setActiveId(undefined);
  };

  return { loading, errorMessage, isCreated, sprintBacklogData, removeAllSprintBacklogState, createSprintBacklog, getSprintBacklogNotCorrespondingSprintList, getSprintBacklogList, handleDragOver, handleDragStart, handleDragEnd, activeId, sprintBacklog };
};
