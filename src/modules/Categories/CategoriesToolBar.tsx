// eslint-disable-next-line 
import React, { useEffect, useState } from "react";

import { Toolbar as ToolBarPrime } from "primereact/toolbar";
import { useCategoriesHook } from "./CategoriesHook";
import { useTranslation } from 'react-i18next';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

type Props = {
  newBtn?: () => void; // Optional function
  heading?: string; // Optional string
  btnHide?: boolean; // Optional boolean
  showSearchFilter?: boolean; // Optional boolean
  label?: string; // Optional string
  layoutType?: string; // Optional string
  showLayoutBtns?: boolean; // Optional boolean
  changeLayout?: (layout: string) => void; // Optional function
};

const CategoriesToolBar = ({
  newBtn = () => {},
  heading = "",
  btnHide = false,
  showSearchFilter = true,
  label = "Categories",
  layoutType = "table",
  showLayoutBtns = true,
  changeLayout = () => {}
}: Props) => {
  const { t, i18n } = useTranslation();

  const {
    getPaginatedCategoriesList,
    updateCategoriesPaginationFilterSearch,
    CategoriesLoading,
    CategoriesFilter,
  } = useCategoriesHook();
  const [searhValue, setSearhValue] = useState<any>("");

  const Refresh = () => {
    getPaginatedCategoriesList();
  };
  /**
   * Handler for setting serach text
   * @param event
   */
  const changeSearchInputValue = (event: any) => {
    setSearhValue(event.target.value);
  };

  /**
   * Handles the user dynamic input text search
   */
  const searchHandler = () => {
    updateCategoriesPaginationFilterSearch({
      filter: searhValue,
      page: 1,
      per_page: 10,
      sort: "categories.created_at|desc",
    });
  };

  /**
   * Handler for clearing the search text
   */
  const onPressClear = () => {
    setSearhValue("");

    updateCategoriesPaginationFilterSearch({
      filter: "",
      page: 1,
      per_page: 10,
      sort: "categories.created_at|desc",
    });
  };

  useEffect(() => {
    if (!CategoriesLoading) {
      getPaginatedCategoriesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CategoriesFilter]);

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
          disabled={CategoriesLoading}
        />
      )}

      <React.Fragment>
        <Button
         text
          icon="pi pi-refresh"
          className=" p-button-info right-spacing"
          aria-label="Bookmark"
          onClick={Refresh}
          tooltip="Reload Table" tooltipOptions={{ position: 'bottom', mouseTrack: false, mouseTrackTop: 15 }}
          disabled={CategoriesLoading}
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
              disabled={CategoriesLoading}
            />
            <Button
               text
              className={`${layoutType === "grid" ? "button-low-opac" : ""}`}
              icon="pi pi-bars"
              onClick={() => changeLayout("table")}
              tooltip="Table view" tooltipOptions={{ position: 'bottom', mouseTrack: false, mouseTrackTop: 15 }}
              disabled={CategoriesLoading}
            />
          </span>
        </React.Fragment>
      )}
      {showSearchFilter && !CategoriesLoading && (
        <React.Fragment>
          <span className="p-input-icon-right">
            {searhValue ? (
              <i className="pi pi-times" onClick={() => onPressClear()} />
            ) : (
              <></>
            )}

            <InputText
              value={searhValue}
              onChange={(event) => changeSearchInputValue(event)}
              placeholder={t('Type here to search')}
              onKeyDown={ ( event: any ) => {
                if ( event.key === "Enter" ) {
                  searchHandler();
                }
              } }
              disabled={CategoriesLoading}
            />
          </span>
          <Button
           text
            icon="pi pi-search"
            className="mr-2"
            onClick={() => searchHandler()}
            disabled={CategoriesLoading}
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

export { CategoriesToolBar };
