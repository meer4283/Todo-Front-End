"use client"
import { TodoTaskList, useTodoTaskHook } from '@/modules/TodoTask';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect } from 'react'

const Page = () => {
    const router = useRouter();
    const { getTodoTaskList, getTodoTaskListFromStore, clearTodoTaskDataHook, TodoTaskLoading } = useTodoTaskHook();

    useEffect(() => {
        getTodoTaskList();
    }, [])
    const totalTask = getTodoTaskListFromStore?.length || 0;
    const completedTask = getTodoTaskListFromStore?.length > 0 ? getTodoTaskListFromStore?.filter((item: TodoItem) => item.completed_status === "YES").length : 0;

    return (
        <>
            {/* Header */}
            <div className="w-full add-container pb-5">
                <Button onClick={() => {
                    router.push("/add-task")
                    clearTodoTaskDataHook()
                }} className=" text-center w-full text-white  rounded-lg flex align-items-center justify-center">
                    Create Task <span className="ml-2">+</span>
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex justify-between align-items-center w-full border-gray-700  mt-12">
                <div className="flex align-items-center gap-2">
                    <span className="text-blue-400">Tasks</span>
                    <span className="bg-gray-700 text-gray-400 px-2  border-round-xl text-sm">{getTodoTaskListFromStore?.length || 0}</span>
                </div>
                <div className="flex align-items-center gap-2">
                    <span className="text-blue-400">Completed</span>
                    <span className="bg-gray-700 text-gray-400 px-2  border-round-xl text-sm">{completedTask} de {totalTask} </span>
                </div>
            </div>
            <Divider />

            {/* Empty State */}
            {getTodoTaskListFromStore?.length > 0 ?
                <TodoTaskList />
                :
                <>
                    {(TodoTaskLoading === true || getTodoTaskListFromStore == null)?
                        <>
                            <Skeleton height="4rem" className='my-2'></Skeleton>
                            <Skeleton height="4rem" className='my-2'></Skeleton>
                            <Skeleton height="4rem" className='my-2'></Skeleton>
                            <Skeleton height="4rem" className='my-2'></Skeleton>
                            <Skeleton height="4rem" className='my-2'></Skeleton>
                      
                        </>
                        
                        :
                        <div className="flex flex-column align-items-center text-center pt-8">
                            <div className="mb-4">
                                <i className="pi pi-file text-gray-500 text-6xl"></i>
                            </div>
                            <p className="text-gray-400">You don't have any tasks registered yet.</p>
                            <p className="text-gray-500">Create tasks and organize your to-do items.</p>
                        </div>

                    }

                </>

            }



        </>


    )
}

export default Page