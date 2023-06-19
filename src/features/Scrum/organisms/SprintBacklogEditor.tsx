import React, { useContext, useEffect, useState } from 'react';
import { FaBackspace } from 'react-icons/fa';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { UserContext } from '../../../services/contexts/user/UserContext';
import { ProductBacklogContext } from '../../../services/contexts/scrum/ProductBacklogContext';
import { SprintBacklogContext } from '../../../services/contexts/scrum/SprintBacklogContext';
import { SprintBacklogDeleteModal } from './SprintBacklogDeleteModal';


interface Props {
  isCreate: boolean;
  sprintBacklogId?: string;
}

export const SprintBacklogEditor: React.FC<Props> = (props) => {
  const { isCreate, sprintBacklogId } = props;
  const { sprintData, getSprintList } = useContext(SprintContext);
  const { userData, getUserList } = useContext(UserContext);
  const { productBacklogData, getProductBacklogList } = useContext(ProductBacklogContext);
  const { createSprintBacklog, isCreated, isDeleted, sprintBacklog, getSprintBacklog, deleteSprintBacklog } = useContext(SprintBacklogContext);

  const [title, setTitle] = useState<string>('');
  const [correspondingProductBacklog, setCorrespondingProductBacklog] = useState<string | undefined>(undefined);
  const [correspondingSprint, setCorrespondingSprint] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [assignee, setAssignee] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>('');

  // modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getSprintList();
    getUserList();
    getProductBacklogList();

    if (!isCreate) {
      getSprintBacklog(sprintBacklogId as string);
    }
  }, []);

  useEffect(() => {
    if (isCreated || isDeleted) {
      window.close();
    }
  }, [isCreated, isDeleted]);

  useEffect(() => {
    if (!isCreate && sprintBacklog) {
      setTitle(sprintBacklog.title);
      setCorrespondingProductBacklog(sprintBacklog.productBacklogId);
      setCorrespondingSprint(sprintBacklog.sprintId);
      setStatus(sprintBacklog.status);
      setPriority(sprintBacklog.priority);
      setAssignee(sprintBacklog.assignee);
      setDescription(sprintBacklog.description);
    }
  }, [sprintBacklog]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCreate) {
      createSprintBacklog(title, correspondingSprint, correspondingProductBacklog, status, priority, assignee, description);
    } else {
      // TODO: update
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const deleteSprintBacklogSubmit = (sprintBacklogId: string) => {
    deleteSprintBacklog(sprintBacklogId);
  }
  return (
    <>
      {isCreate ? null : (
        <SprintBacklogDeleteModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} sprintBacklogId={sprintBacklogId as string} deleteSprintBacklog={deleteSprintBacklogSubmit} />
      )}
      <h1 className='text-3xl font-bold pt-4'>{isCreate ? 'スプリントバックログ作成' : 'スプリントバックログ編集'}</h1>
      <div className='flex justify-end mt-1'>
        <button className='text-white px-4 py-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500'
          onClick={() => { window.close() }}
        >
          <FaBackspace />
        </button>
      </div>
      <div className='bg-white p-6 rounded-md shadow-md mt-1'>
        <div className='flex justify-end mt-4'>
          <button className='text-white px-4 py-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500'
            onClick={handleSubmit}
          >
            {isCreate ? '作成' : '更新'}
          </button>
          {!isCreate && (
            <button className='text-white px-4 py-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-red-600 hover:bg-red-500 ml-2'
              onClick={() => { handleDelete() }}
            >
              削除
            </button>
          )}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <label htmlFor="title" className='text-sm'>タイトル</label>
            <input type="text" name='title' id='title' className='w-full border border-gray-300 rounded-md p-2 mt-1'
              value={title} onChange={(e) => { setTitle(e.target.value) }}
            />
          </div>
          <div className='col-span-2'>
            <label htmlFor="sprint" className='text-sm'>プロダクトバックログアイテム</label>
            <select name="sprint" id="sprint" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={correspondingProductBacklog} onChange={(e) => { setCorrespondingProductBacklog(e.target.value) }}>
              <option value={undefined}>紐付けなし</option>
              {productBacklogData && productBacklogData.length > 0 && (
                productBacklogData.map((productBacklog, index) => (
                  <option key={index} value={productBacklog.productBacklogId}>{productBacklog.title}</option>
                ))
              )}
            </select>
          </div>
          <div>
            <label htmlFor="sprint" className='text-sm'>対応スプリント</label>
            <select name="sprint" id="sprint" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={correspondingSprint} onChange={(e) => { setCorrespondingSprint(e.target.value) }}>
              <option value={undefined}>紐付けなし</option>
              {sprintData && sprintData.length > 0 && (
                sprintData.map((sprint, index) => (
                  <option key={index} value={sprint.sprintId}>{sprint.name}</option>
                ))
              )}
            </select>
          </div>
          <div>
            <label htmlFor="status" className='text-sm'>ステータス</label>
            <select name="status" id="status" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={status} onChange={(e) => { setStatus(Number(e.target.value)) }}>
              <option value={0}>Not started</option>
              <option value={1}>Started</option>
              <option value={2}>Review</option>
              <option value={3}>Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className='text-sm'>優先度</label>
            <select name="priority" id="priority" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={priority} onChange={(e) => { setPriority(Number(e.target.value)) }}>
              <option value={0}>低</option>
              <option value={1}>中</option>
              <option value={2}>高</option>
            </select>
          </div>
          <div>
            <label htmlFor="assignee" className='text-sm'>担当者</label>
            <select name="assignee" id="assignee" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={assignee} onChange={(e) => { setAssignee(e.target.value) }}>
              <option value={undefined}>未割り当て</option>
              {userData && userData.length > 0 && (
                userData.map((user, index) => (
                  <option key={index} value={user.id}>{user.username}</option>
                ))
              )}
            </select>
          </div>
          <div className='col-span-2'>
            <label htmlFor="description" className='text-sm'>説明</label>
            <textarea name="description" id="description" rows={30} className='w-full border border-gray-300 rounded-md p-2 mt-1' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
          </div>
        </div>
        {!isCreate && (
          <div className='mt-4'>
            <p>最終更新者: aaa</p>
            <p>最終更新日: 2021/01/01</p>
          </div>
        )}
      </div>
    </>
  )
}
