import React from 'react'
import { FaBackspace } from 'react-icons/fa'


interface Props {
    isCreate: boolean
}

export const SprintBacklogEditor: React.FC<Props> = (props) => {
    const { isCreate } = props;

    return (
        <>
            <h1 className='text-3xl font-bold pt-4'>{isCreate ? 'スプリントバックログ作成' : 'スプリントバックログ編集'}</h1>
            <div className='flex justify-end mt-1'>
                <button className='text-white px-4 py-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500'
                    onClick={() => { window.close() }}
                >
                    <FaBackspace />
                </button>
            </div>
            <div className='bg-white p-6 rounded-md shadow-md mt-1'>
                <form action="">
                    <div className='flex justify-end mt-4'>
                        <button className='text-white px-4 py-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500'>更新</button>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                            <label htmlFor="title" className='text-sm'>タイトル</label>
                            <input type="text" name='title' id='title' className='w-full border border-gray-300 rounded-md p-2 mt-1' />
                        </div>
                        <div>
                            <label htmlFor="sprint" className='text-sm'>対応スプリント</label>
                            <select name="sprint" id="sprint" className='w-full border border-gray-300 rounded-md p-2 mt-1'>
                                <option value="sprint1">sprint1</option>
                                <option value="sprint2">sprint2</option>
                                <option value="sprint3">sprint3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className='text-sm'>ステータス</label>
                            <select name="status" id="status" className='w-full border border-gray-300 rounded-md p-2 mt-1'>
                                <option value="todo">TODO</option>
                                <option value="doing">DOING</option>
                                <option value="done">DONE</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="priority" className='text-sm'>優先度</label>
                            <select name="priority" id="priority" className='w-full border border-gray-300 rounded-md p-2 mt-1'>
                                <option value="low">低</option>
                                <option value="middle">中</option>
                                <option value="high">高</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="assignee" className='text-sm'>担当者</label>
                            <select name="assignee" id="assignee" className='w-full border border-gray-300 rounded-md p-2 mt-1'>
                                <option value="user1">user1</option>
                                <option value="user2">user2</option>
                                <option value="user3">user3</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="description" className='text-sm'>説明</label>
                            <textarea name="description" id="description" rows={30} className='w-full border border-gray-300 rounded-md p-2 mt-1' />
                        </div>
                    </div>
                    <p>最終更新者: aaa</p>
                    <p>最終更新日: 2021/01/01</p>
                </form>
            </div>
        </>
    )
}
