import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

import { SprintBacklog, SprintBacklogDTO } from "../../../types/scrum/sprintBacklog";

interface Props {
  id: UniqueIdentifier;
  item: SprintBacklogDTO;
  handleEdit: (sprintBacklogId: string) => void;
}

const SortableItem: React.FC<Props> = ({ id, item, handleEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item id={id} item={item} handleEdit={handleEdit}/>
    </div>
  );
};

export default SortableItem;
