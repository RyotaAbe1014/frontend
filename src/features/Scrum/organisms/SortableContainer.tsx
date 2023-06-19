import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { SprintBacklogDTO } from "../../../types/scrum/sprintBacklog";




const SortableContainer = ({
  id,
  items,
  label,
  handleEdit,
}: {
  id: string;
  items: SprintBacklogDTO[];
  label: string;
  handleEdit: (sprintBacklogId: string) => void;
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className="w-[calc(33%-5px)]">
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext id={id} items={items.map(item => item.sprintBacklogId)} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className="w-full border-2 p-5 mt-2 rounded-md shadow-md bg-white max-h-screen overflow-x-scroll"
        >
          {items.map((item: SprintBacklogDTO) => (
            <SortableItem key={item.sprintBacklogId} id={item.sprintBacklogId} item={item} handleEdit={handleEdit}/>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
