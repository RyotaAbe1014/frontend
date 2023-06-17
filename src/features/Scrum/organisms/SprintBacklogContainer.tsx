import React, { useState, MouseEvent, KeyboardEvent, useEffect, useContext } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SortableContainer from "./SortableContainer";
import Item from "./Item";
import { SprintBacklogContext } from "../../../services/contexts/scrum/SprintBacklogContext";


interface Props {
  correspondingSprintId: string;
  correspondingProductBacklogId?: string;
}


export const SprintBacklogContainer: React.FC<Props> = ({ correspondingSprintId, correspondingProductBacklogId }) => {
  const { sprintBacklogData, removeAllSprintBacklogState, getSprintBacklogNotCorrespondingSprintList, getSprintBacklogList, handleDragOver, handleDragStart, handleDragEnd, activeId, sprintBacklog } = useContext(SprintBacklogContext);
  // ドラッグ&ドロップでソート可能なリスト
  // アイテムの状態は、notStarted, inProgress, review, doneの4つ
  // 初期取得
  useEffect(() => {
    // correspondingSprintIdがnoCorrespondingSprintの場合は、紐付けなしのアイテムを取得する
    // それ以外の場合は、対応スプリントに紐付けられたアイテムを取得する
    if (correspondingSprintId === 'noCorrespondingSprint') {
      getSprintBacklogNotCorrespondingSprintList(correspondingProductBacklogId);
    } else {
      getSprintBacklogList(correspondingSprintId, correspondingProductBacklogId);
    }
    return () => {
      removeAllSprintBacklogState();
    }
  }, [correspondingSprintId, correspondingProductBacklogId]);

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
          items={sprintBacklogData.notStarted}
          label="notStarted"
        />
        <SortableContainer
          id="inProgress"
          label="inProgress"
          items={sprintBacklogData.inProgress}
        />
        <SortableContainer
          id="review"
          label="review"
          items={sprintBacklogData.review}
        />
        <SortableContainer
          id="done"
          label="done"
          items={sprintBacklogData.done}
        />
        {/* DragOverlay */}
        <DragOverlay>{activeId ? <Item id={activeId} item={sprintBacklog} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
};
