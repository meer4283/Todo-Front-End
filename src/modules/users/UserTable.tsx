import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";

import React, { useState } from "react";
import { UserSidebar } from "./UserSidebar";
import { DataTableSkeleton } from "../../component/Skeleton/DataTableSkeleton";
import { useUserHook } from "@/hooks";
import { Dialog } from "primereact/dialog";
import { UserSubscriptionModal } from "./UserSubscriptionModal";

export const UserTable = (props: any) => {
  const {
    items,
    loading,
    tableSettings,
  } = props;

  const {
    deleteForm,
    updateUserStateDataUpdateHook,
    UserSortField,
    UserSortOrder,
    UserSubmit,
    clearUserDataHook
  } = useUserHook();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProductItemViewSidebar, setShowProductItemViewSidebar] = useState<boolean | any>(false);
  const [showUserSubscription, setShowUserSubscription] = useState(false)

  const [userId, setUserId] = useState<any>();

  const onSort = (event: any) => {
    let sortString = "";
    sortString += event.sortField;
    if (event.sortOrder === 1) {
      sortString += "|desc";
    } else if (event.sortOrder === -1) {
      sortString += "|asc";
    }
    updateUserStateDataUpdateHook({
      ...event,
      sort: sortString,
    });
  };

  const deleteRowHandler = (row: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
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
      <React.Fragment key={`action_body_${row?.id}`} >
        <Button
          text
          type="button"
          className=""
          onClick={() => {
            setUserId(row?.id);
            setShowUserSubscription(true)
          }}
          icon="pi pi-credit-card"
        ></Button>
        <Button
          text
          type="button"
          className="p-button-info "
          onClick={() => {
            console.log("row?.id", row?.id);
            setUserId(row?.id);
            setShowProductItemViewSidebar(true);
          }}
          icon="pi pi-pencil"
        ></Button>
      </React.Fragment >

    );
  };

  return (
    <>
      <Dialog header="User Subscriptions" visible={showUserSubscription} style={{ width: '50vw' }} onHide={() => { if (!showUserSubscription) return; setShowUserSubscription(false); }}>
        <UserSubscriptionModal showUserSubscription={showUserSubscription} userId={userId} setShowUserSubscription={setShowUserSubscription} />
      </Dialog>
      <Sidebar
        dismissable={false}
        className="p-sidebar-lg"
        position="right"
        visible={showProductItemViewSidebar}
        onHide={() => {
          setShowProductItemViewSidebar(false)
          clearUserDataHook()
          setUserId(null)
        }}
        showCloseIcon={!UserSubmit}
      >
        <UserSidebar
          userId={userId}
          setUserId={setUserId}
          setShowSidebar={setShowProductItemViewSidebar}
        />
      </Sidebar>
      <div>
        <div>
          {!loading ? (
            <DataTable
              value={items}
              scrollable
              scrollHeight="calc(100vh - 350px)"
              showGridlines={tableSettings?.showGridlines}
              stripedRows={tableSettings?.stripedRows}
              size={tableSettings?.size}
              onSort={onSort}
              sortField={UserSortField}
              sortOrder={UserSortOrder}
            >
              <Column
                style={{ width: "15%" }}
                header={"Name"}
                sortable
                field="name"
                bodyStyle={{ fontWeight: "bold" }}
              ></Column>

<Column
                style={{ width: "15%" }}
                header={"Phone Number"}
                sortable
                field="phone_number"
                
              ></Column>
              <Column
                style={{ width: "15%" }}
                header={"Email"}
                sortable
                field="email"
                
              ></Column>



              <Column
                header={"Actions"}
                style={{ width: "10%" }}
                headerStyle={{ textAlign: "left" }}
                bodyStyle={{ textAlign: "left", overflow: "visible" }}
                body={(e) => actionBodyTemplate(e)}
              />
            </DataTable>
          ) : (
            <DataTableSkeleton
              noOfRows={15}
              columns={[
                { field: "id", header: "Name" },
                { field: "id", header: "Email" },
                { field: "id", header: "Actions" },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};
