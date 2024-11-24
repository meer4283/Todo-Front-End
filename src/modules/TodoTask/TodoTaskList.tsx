import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useTodoTaskHook } from "./TodoTaskHook";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dialog } from "primereact/dialog";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";
import { RadioButton } from "primereact/radiobutton";


export const TodoTaskList = (props: any) => {

  const { deleteForm, clearTodoTaskDataHook, TodoTaskLoading, TodoTaskSubmit, getTodoTaskListFromStore, updateForm } = useTodoTaskHook();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTodoTaskItemViewSidebar, setShowTodoTaskItemViewSidebar] = useState<boolean>(
    false
  );

  const [todoTaskId, setTodoTaskId] = useState<any>();
  const { t, i18n } = useTranslation();
  const markComplete = (index: number, todoItem:TodoItem) => {
    updateForm(todoItem.id, {...todoItem, completed_status: "YES", completed_at:moment().format()}, ()=>{}, false, ()=>{})
  };

  const handleDelete = (index: number) => {
    console.log(`Deleted item at index: ${index}`);
  };
  const deleteRowHandler = (row: any) => {
    confirmDialog({
      message: t('Do you want to delete this record?'),
      header: t('Delete confirmation'),
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteForm(row);
      },
      reject: () => { },
    });
  };

  const actionBodyTemplate = (row: any) => {
    return (
      <>
        <Button
          text
          type="button"
          className="p-button-info "
          onClick={() => {
            setTodoTaskId(row?.id);
            setShowTodoTaskItemViewSidebar(true);
          }}
          icon="pi pi-pencil"
        ></Button>

        <Button
          text
          type="button"
          className="p-button-info "
          onClick={() => {
            setTodoTaskId(row?.id);
            setShowModal(true);
          }}
          icon="pi pi-eye"
        ></Button>

        <Button
          text
          type="button"
          className="p-button-danger left-space"
          onClick={() => deleteRowHandler(row)}
          icon="pi pi-trash"
        ></Button>
      </>
    );
  };
  return (
    <>
    <ConfirmDialog />
      <div className="w-full block">
        {!TodoTaskLoading ? (
          <>
            {getTodoTaskListFromStore.map((todoItem: TodoItem, index: number) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 mb-3 rounded-lg border ${todoItem.completed_status === "YES"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-900 border-gray-800"
                  }`}
              >
                {/* Radio Button & Text */}
                <div className="flex items-center">
                  {todoItem.completed_status !== "YES" ?
                    <Button size="large"  text icon="pi pi-circle" className="p-0" onClick={()=>{ markComplete(index, todoItem)}} />
                    :
                    <Button size="large" text icon="pi pi-check-circle" className="p-0" />
                  }
                  <label
                    htmlFor={`todoItem-${index}`}
                    className={`ml-3 text-sm ${todoItem.completed_status === "YES"
                      ? "text-gray-400 line-through"
                      : "text-gray-300"
                      }`}
                  >
                    {todoItem.title}
                  </label>
                </div>

                {/* Delete Icon */}
                <Button text icon="pi pi-trash" onClick={()=> deleteRowHandler(todoItem)} />

              </div>
            ))}

          </>
        ) : (
          <DataTableSkeleton
            noOfRows={15}
            columns={[
              { field: "id", header: "ID" },
              { field: "created_at", header: t('Created') },
            ]}
          />
        )}
      </div>
    </>
  );
};
