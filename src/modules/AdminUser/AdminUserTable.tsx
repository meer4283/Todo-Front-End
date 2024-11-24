import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useAdminUserHook } from "./AdminUserHook";
import { confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { AdminUserSidebar } from "./AdminUserSidebar";
import { useTranslation } from 'react-i18next';
import { AdminUserModal } from "./AdminUserModal";
import { Dialog } from "primereact/dialog";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";


export const AdminUserTable = (props: any) => {
  const { items, loading, } = props;

  const { deleteForm, clearAdminUserDataHook, AdminUserLoading, AdminUserSubmit, } = useAdminUserHook();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAdminUserItemViewSidebar, setShowAdminUserItemViewSidebar] = useState<boolean>(
    false
  );

  const [adminUserId, setAdminUserId] = useState<any>();
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
            setAdminUserId(row?.admin_user_id);
            setShowAdminUserItemViewSidebar(true);
          }}
          icon="pi pi-pencil"
        ></Button>

        <Button
          text
          type="button"
          className="p-button-info "
          onClick={() => {
            setAdminUserId(row?.admin_user_id);
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
      <Dialog
        maximizable
        onHide={() => { setShowModal(false) }}
        header="AdminUser"
        visible={showModal}
        style={{ width: "50vw" }}
        footer={() => (
          <>
            <Button label="Close" className="p-button-danger" onClick={() => setShowModal(false)} />

          </>
        )}
      >
        <AdminUserModal adminUserId={null} setAdminUserId={function (id: number | any): void {
          throw new Error("Function not implemented.");
        } } />
      </Dialog>

      <Sidebar
        dismissable={false}
        className="p-sidebar-lg"
        position="right"
        visible={showAdminUserItemViewSidebar}
        onHide={() => setShowAdminUserItemViewSidebar(false)}
        showCloseIcon={!AdminUserSubmit}
      >
        <AdminUserSidebar
          adminUserId={adminUserId}
          setAdminUserId={setAdminUserId}
          setShowSidebar={setShowAdminUserItemViewSidebar}
        />
      </Sidebar>
      <div>
        <div>




          {!loading ? (
            <DataTable value={items} scrollable scrollHeight="calc(100vh - 350px)"
            >
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
                field="user_name"
                header={t('Name')}
                className="font-bold"

              ></Column>

              <Column
                style={{ width: "10%" }}
                field="email"
                header={t('Email')}
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
                { field: "admin_user_id", header: "ID" },
                { field: "created_at", header: t('Created') },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};
