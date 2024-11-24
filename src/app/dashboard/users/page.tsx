"use client"

import React, { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { UserSidebar } from "@/modules/users/UserSidebar";
import { UserTable } from "@/modules/users/UserTable";
import { UserToolBar } from "@/modules/users/UserToolBar";
import { useLoginDetails } from "@/hooks";
import { useUserHook } from "@/hooks";
import { UserPaginator } from "@/modules/users/UserPaginator";

const UserModule = () => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const onClickNewBtn = () => setShowSidebar(true);

  const {
    UserLoading,
    UserHTTPRequest,
    UserSubmit,
    getPaginatedUserListFromStore,
    UserLayoutType,
    changeUserLayoutType,
    getPaginatedUserList,
    updateUserIsInitialTableDataLoaded,
    clearUserDataHook,
  } = useUserHook();
  const items = getPaginatedUserListFromStore;

  useEffect(() => {
    /**
     * Check if store is empty, else get
     */
    if (!items) {
      getPaginatedUserList();
    }

    return () => {
      updateUserIsInitialTableDataLoaded(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeLayout = (type: string = "table") => {
    changeUserLayoutType(type);
  };

  const { userDetail } = useLoginDetails();

  return (
    <>
      <Sidebar
        dismissable={false}
        className="p-sidebar-lg"
        position="right"
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
        showCloseIcon={!UserSubmit}
      >
        <UserSidebar setShowSidebar={setShowSidebar} />
      </Sidebar>

      <UserToolBar
        heading={"Users"}
        newBtn={onClickNewBtn}
        showLayoutBtns={false}
        showSearchFilter={true}
        changeLayout={onChangeLayout}
        layoutType={UserLayoutType}
      />
      <div className="grid">
        <div className="col-12">
          <UserTable
            items={items}
            loading={UserLoading}
            tableSettings={
              userDetail?.userDetail?.user_meta_data
                ? JSON.parse(userDetail?.userDetail.user_meta_data)
                    ?.tableSettings
                : ""
            }
          />
        </div>
      </div>
      <UserPaginator />
    </>
  );
};

export default UserModule;
