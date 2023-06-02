import { ComponentProps, FC, ReactNode, useCallback, useMemo } from 'react';
import {
  DndContext,
  UniqueIdentifier,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragEndEvent,
  closestCenter
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

// idを含むインターフェイス
export interface HasId {
  id: UniqueIdentifier;
};

// ドラッグ&ドロップ可能なリストアイテム
type MyDraggableListProps<T extends HasId> = {
  items: T[];
  onDragStart: ComponentProps<typeof DndContext>['onDragStart'];
  onDragEnd: ComponentProps<typeof DndContext>['onDragEnd'];
  layout: 'horizontal' | 'vertical' | 'grid';
  children: ReactNode;
};

// ドラッグ&ドロップ可能なリストアイテム
export const MyDraggableList: FC<MyDraggableListProps<HasId>> = ({
  items,
  onDragStart,
  onDragEnd,
  layout,
  children
}) => {
  // ドラッグ&ドロップする時に許可する入力
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // リストの種類
  const strategy = useMemo(() => {
    switch (layout) {
      case 'horizontal':
        return horizontalListSortingStrategy;
      case 'vertical':
        return verticalListSortingStrategy;
      case 'grid':
      default:
        return rectSortingStrategy;
    }
  }, [layout]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <SortableContext
        items={items}
        strategy={strategy}
      >
        <ul>
          {children}
        </ul>
      </SortableContext>
    </DndContext>
  );
}


// ドラッグ&ドロップ可能なリストアイテム
export const MyDraggableItem: FC<{
  id: HasId['id'];
  children: ReactNode;
}> = ({
  id,
  children
}) => {
    const { setNodeRef } = useSortable({ id });

    return (
      <li ref={setNodeRef}>
        {children}
      </li>
    )
  }

// MyDraggableItemをドラッグ&ドロップするためのハンドル
export const MyDraggableHandle: FC<{
  id: HasId['id'];
  children: ReactNode;
}> = ({
  id,
  children
}) => {
    const { attributes, listeners,transform, transition } = useSortable({ id });
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
    };

    return (
      <div {...attributes} {...listeners} style={style}>
        {children}
      </div>
    )
  }