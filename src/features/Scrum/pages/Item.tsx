import { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

import { SprintBacklog } from "../../../types/scrum/sprintBacklog";
import { SprintBacklogEditModal } from "../organisms/SprintBacklogEditModal";


interface Props {
  id: UniqueIdentifier;
  item?: SprintBacklog;
}

const Item: React.FC<Props> = ({ item }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleEdit = () => {
    setShowEditModal(true);
  }
  return (
    <>
      <div className="w-full h-48 my-2.5 bg-white p-4 rounded-md shadow-md">
        <p className="text-lg font-bold">{item?.title}</p>
        <p>最終更新者: <span>{item?.updatedBy}</span></p>
        <p>最終更新日: <span>{item?.updatedAt}</span></p>

        <div className="pt-5">
          <button
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500"
            onClick={() => { handleEdit() }}
            data-dndkit-disabled-dnd-flag="true"
          >
            詳細
          </button>
        </div>
      </div>
      <SprintBacklogEditModal isCreate={false} isOpen={showEditModal} setIsOpen={setShowEditModal} />
    </>
  );
};
export default Item;
