"use client";
import React from "react";
import { Button } from "primereact/button";
import { TodoTaskAddUpdate } from "@/modules/TodoTask";
import { useRouter } from "next/navigation";

const CreateTask = () => {
    const router = useRouter()
    return (
        <div className="w-full">
            <div className="mb-4">
                <Button
                    icon="pi pi-arrow-left"
                    className="p-button-text text-white"
                    onClick={() => router.back()}
                />
            </div>
           <TodoTaskAddUpdate />
        </div>
    );
};

export default CreateTask;
