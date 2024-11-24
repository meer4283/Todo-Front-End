import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useTodoTaskHook } from "./TodoTaskHook";
import { confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dialog } from "primereact/dialog";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";


export const TodoTaskList = (props: any) => {
  const { items, loading, } = props;

  const { deleteForm, clearTodoTaskDataHook, TodoTaskLoading, TodoTaskSubmit, } = useTodoTaskHook();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTodoTaskItemViewSidebar, setShowTodoTaskItemViewSidebar] = useState<boolean>(
    false
  );

  const [todoTaskId, setTodoTaskId] = useState<any>();
  const { t, i18n } = useTranslation();

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
            setTodoTaskId(row?.todo_task_id);
            setShowTodoTaskItemViewSidebar(true);
          }}
          icon="pi pi-pencil"
        ></Button>

        <Button
          text
          type="button"
          className="p-button-info "
          onClick={() => {
            setTodoTaskId(row?.todo_task_id);
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

      <div>
        <div>




          {!loading ? (
            <DataTable value={items} scrollable scrollHeight="calc(100vh - 350px)"
            >
              <Column
                style={{ width: "10%" }}
                field="todo_task_id"
                header={t('ID')}
                sortable
              ></Column>

              <Column
                style={{ width: "10%" }}
                field="created_at"
                header={t('Created')}
                body={(row) => (
                  <>{moment(row?.created_at).format("Do MMM YYYY HH:mm")}</>
                )}
                sortable
              ></Column>

              <Column
                style={{ width: "10%" }}
                field="todo_task_title"
                header={t('Todo Task Title')}
                className="font-bold"

              ></Column>



              <Column
                style={{ width: "10%" }}
                headerStyle={{ textAlign: "center" }}
                bodyStyle={{ textAlign: "left", overflow: "visible" }}
                body={(e) => actionBodyTemplate(e)}
              />
            </DataTable>
          ) : (
            <DataTableSkeleton
              noOfRows={15}
              columns={[
                { field: "todo_task_id", header: "ID" },
                { field: "created_at", header: t('Created') },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};
