import React, { useEffect, useState } from "react";
import { Toolbar as ToolBarPrime } from "primereact/toolbar";
import { useUserHook } from "@/hooks";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const UserToolBar = (props: any) => {
  const {
    newBtn,
    heading,
    btnHide,
    showSearchFilter,
    label,
    layoutType,
    changeLayout,
    showLayoutBtns,
  } = props;

  const {
    getPaginatedUserList,
    updateUserPaginationFilterSearch,
    UserLoading,
    UserFilter,
  } = useUserHook();
  const [searhValue, setSearhValue] = useState<any>("");

  const Refresh = () => {
    getPaginatedUserList();
  };

  const changeSearchInputValue = (event: any) => {
    setSearhValue(event.target.value);
  };

  const searchHandler = () => {
    updateUserPaginationFilterSearch({
      filter: searhValue,
      page: 1,
      per_page: 10,
      sort: "user.created_at|desc",
    });
  };

  const onPressClear = () => {
    setSearhValue("");

    updateUserPaginationFilterSearch({
      filter: "",
      page: 1,
      per_page: 10,
      sort: "user.created_at|desc",
    });
  };

  useEffect(() => {
    if (!UserLoading) {
      getPaginatedUserList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserFilter]);

  const leftContents = (
    <>
      {heading && (
        <div style={{ width: "350px" }}>
          <h3 className="mr-5 mb-0">
            <i className={`mx-2 text-bold pi-fs-2 pi`} />
            {heading}
          </h3>
        </div>
      )}
    </>
  );

  const rightContents = (
    <>
      <Button
        onClick={newBtn}
        label={label}
        icon="pi pi-plus"
        className="mr-2 p-button-primary"
        disabled={UserLoading}
      />

      <Button
        text
        icon="pi pi-refresh"
        className=" p-button-info right-spacing"
        aria-label="Bookmark"
        onClick={Refresh}
        tooltip="Reload Table"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: false,
          mouseTrackTop: 15,
        }}
        disabled={UserLoading}
      />

      {showSearchFilter && !UserLoading && (
        <>
          <span className="p-input-icon-right">
            {searhValue ? (
              <i className="pi pi-times" onClick={() => onPressClear()} />
            ) : (
              <></>
            )}
            <InputText
              value={searhValue}
              onChange={(event) => changeSearchInputValue(event)}
              placeholder={"Type here to search"}
              onKeyDown={(event: any) => {
                if (event.key === "Enter") {
                  searchHandler();
                }
              }}
              disabled={UserLoading}
            />
          </span>
          <Button
            text
            icon="pi pi-search"
            className="mr-2"
            onClick={() => searchHandler()}
            disabled={UserLoading}
          />
        </>
      )}
    </>
  );

  return (
    <>
      <ToolBarPrime
        className="tool-bar mb-3"
        start={leftContents}
        end={rightContents}
      />
    </>
  );
};



export { UserToolBar };
