import React, { useState, MouseEvent, KeyboardEvent } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SortableContainer from "./SortableContainer";
import Item from "./Item";
import { SprintBacklog } from "../../../types/scrum/sprintBacklog";


interface Props {
  correspondingSprintId: string;
}


export const SprintBacklogContainer: React.FC<Props> = ({ correspondingSprintId }) => {
  // ドラッグ&ドロップでソート可能なリスト
  const [items, setItems] = useState<{ [key: string]: SprintBacklog[]; }>({
    notStarted: [
      {
        sprintBacklogId: "A",
        title: "Title A",
        description: "Description A",
        progress: 0,
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        updatedBy: "User"
      },
    ],
    inProgress: [
      {
        sprintBacklogId: "D",
        title: "Title D",
        description: "Description D",
        progress: 25,
        createdAt: "2023-02-01",
        updatedAt: "2023-02-01",
        updatedBy: "User"
      },
    ],
    review: [
      {
        sprintBacklogId: "G",
        title: "Title G",
        description: "Description G",
        progress: 50,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",
        updatedBy: "User"
      },
      {
        sprintBacklogId: "H",
        title: "Title H",
        description: "Description H",
        progress: 50,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",
        updatedBy: "User"
      },
      {
        sprintBacklogId: "I",
        title: "Title I",
        description: "Description I",
        progress: 50,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",
        updatedBy: "User"
      },
    ],
    done: [
      {
        sprintBacklogId: "J",
        title: "Title J",
        description: "Description J",
        progress: 100,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",
        updatedBy: "User"
      },
    ],
  });

  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [sprintBacklog, setSprintBacklog] = useState<SprintBacklog | undefined>(undefined);

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  // data-dndkit-disabled-dnd-flag="true" が指定されている要素はドラッグ無効にする
  function shouldHandleEvent(element: HTMLElement | null) {
    let cur = element;

    while (cur) {
      if (cur.dataset && cur.dataset.dndkitDisabledDndFlag) {
        return false;
      }
      cur = cur.parentElement;
    }

    return true;
  }

  class MouseSensor extends LibMouseSensor {
    static activators = [
      {
        eventName: "onMouseDown" as const,
        handler: ({ nativeEvent: event }: MouseEvent): boolean => {
          return shouldHandleEvent(event.target as HTMLElement);
        },
      },
    ];
  }
  
  // LibKeyboardSensor を override してドラッグ無効にする
  class KeyboardSensor extends LibKeyboardSensor {
    static activators = [
      {
        eventName: "onKeyDown" as const,
        handler: ({ nativeEvent: event }: KeyboardEvent<Element>): boolean => {
          return shouldHandleEvent(event.target as HTMLElement);
        },
      },
    ];
  }
  // useSensor と useSensors を使って上書きした Sensor を DndContext に紐付ける
  const mouseSensor = useSensor(MouseSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  //各コンテナ取得関数
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key: string) =>
      items[key].some(item => item.sprintBacklogId === id.toString())
    );
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id.toString();
    setActiveId(id);

    const containerKey = findContainer(id);

    if (containerKey !== undefined) {
      const item = items[containerKey].find(item => item.sprintBacklogId === id);
      setSprintBacklog(item);
    }
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

    setItems((prev) => {
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
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
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
    const activeIndex = items[activeContainer].findIndex(item => item.sprintBacklogId === id);
    const overIndex = items[overContainer].findIndex(item => item.sprintBacklogId === overId.toString());

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(undefined);
  };

  return (
    <div className="flex flex-row mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* SortableContainer */}
        <SortableContainer
          id="notStarted"
          items={items.notStarted}
          label="notStarted"
        />
        <SortableContainer
          id="inProgress"
          label="inProgress"
          items={items.inProgress}
        />
        <SortableContainer
          id="review"
          label="review"
          items={items.review}
        />
        <SortableContainer
          id="done"
          label="done"
          items={items.done}
        />
        {/* DragOverlay */}
        <DragOverlay>{activeId ? <Item id={activeId} item={sprintBacklog} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
};
