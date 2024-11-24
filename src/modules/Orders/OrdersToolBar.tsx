// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Toolbar as ToolBarPrime } from "primereact/toolbar";
import { useOrdersHook } from "./OrdersHook";
import { useTranslation } from 'react-i18next';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

type Props = {
  newBtn: () => void;
  heading: string;
  btnHide: boolean;
  showSearchFilter: boolean;
  layoutType?: string;
  showLayoutBtns?: boolean;
  changeLayout?: (layout:string) => void;
};
const OrdersToolBar = (props: Props | any) => {
  const { t, i18n } = useTranslation();
  const {

    newBtn =() => {},
  changeLayout = () => {},
  isDisabled= true,
  btnHide= false,
  showLayoutBtns= true,
  showSearchFilter = true,
  heading= "",
  label= "Orders",
  layoutType= "table",
  } = props;

  const {
    getPaginatedOrdersList,
    updateOrdersPaginationFilterSearch,
    OrdersLoading,
    OrdersFilter,
  } = useOrdersHook();
  const [searchValue, setSearchValue] = useState<any>("");

  const Refresh = () => {
    getPaginatedOrdersList();
  };
  /**
   * Handler for setting search text
   * @param event
   */
  const changeSearchInputValue = (event: any) => {
    setSearchValue(event.target.value);
  };

  /**
   * Handles the user dynamic input text search
   */
  const searchHandler = () => {
    updateOrdersPaginationFilterSearch({
      filter: searchValue,
      page: 1,
      per_page: 10,
      sort: "orders.created_at|desc",
    });
  };

  /**
   * Handler for clearing the search text
   */
  const onPressClear = () => {
    setSearchValue("");

    updateOrdersPaginationFilterSearch({
      filter: "",
      page: 1,
      per_page: 10,
      sort: "orders.created_at|desc",
    });
  };

  useEffect(() => {
    if (!OrdersLoading) {
      getPaginatedOrdersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OrdersFilter]);

  /**
   * Toolbar left content
   */
  const leftContents = (
    <React.Fragment>
      {heading && (
        <div style={{ width: "350px" }}>
          <h3 className="mr-5 mb-0">
            <i className={`mx-2 text-bold pi-fs-2 pi`} />
            {heading}
          </h3>
        </div>
      )}
    </React.Fragment>
  );

  /**
   * Toolbar right content
   */
  const rightContents = (
    <React.Fragment>
      {!btnHide && (
        <Button
     
          onClick={newBtn}
          label={label}
          icon="pi pi-plus"
          className="mr-2 p-button-primary"
          disabled={OrdersLoading}
        />
      )}

      <React.Fragment>
        <Button
         text
          icon="pi pi-refresh"
          className=" p-button-info right-spacing"
          aria-label="Bookmark"
          onClick={Refresh}
          tooltip="Reload table" tooltipOptions={{ position: 'bottom', mouseTrack: false, mouseTrackTop: 15 }}
          disabled={OrdersLoading}
        />
      </React.Fragment>

      {showLayoutBtns && (
        <React.Fragment>
          <span className="p-buttonset">
            <Button
              text
              className={`${layoutType === "table" ? "button-low-opac" : ""}`}
              icon="pi pi-th-large"
              onClick={() => changeLayout("grid")}
              tooltip="Grid view" tooltipOptions={{ position: 'bottom', mouseTrack: false, mouseTrackTop: 15 }}
              disabled={OrdersLoading}
            />
            <Button
               text
              className={`${layoutType === "grid" ? "button-low-opac" : ""}`}
              icon="pi pi-bars"
              onClick={() => changeLayout("table")}
              tooltip="Table view" tooltipOptions={{ position: 'bottom', mouseTrack: false, mouseTrackTop: 15 }}
              disabled={OrdersLoading}
            />
          </span>
        </React.Fragment>
      )}
      {showSearchFilter && !OrdersLoading && (
        <React.Fragment>
          <span className="p-input-icon-right">
            {searchValue ? (
              <i className="pi pi-times" onClick={() => onPressClear()} />
            ) : (
              <></>
            )}

            <InputText
              value={searchValue}
              onChange={(event) => changeSearchInputValue(event)}
              placeholder={t('Type here to search')}
              onKeyDown={ ( event: any ) => {
                if ( event.key === "Enter" ) {
                  searchHandler();
                }
              } }
              disabled={OrdersLoading}
            />
          </span>
          <Button
           text
            icon="pi pi-search"
            className="mr-2"
            onClick={() => searchHandler()}
            disabled={OrdersLoading}
          />
        </React.Fragment>
      )}
    </React.Fragment>
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



export { OrdersToolBar };
