import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

import { SprintBacklog, SprintBacklogDTO } from "../../../types/scrum/sprintBacklog";

interface Props {
  id: UniqueIdentifier;
  item: SprintBacklogDTO;
}

const SortableItem: React.FC<Props> = ({ id, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item id={id} item={item} />
    </div>
  );
};

export default SortableItem;
