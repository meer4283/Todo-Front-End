"use client"
import React, { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  CuisineToolBar,
  CuisineTable,
  CuisinePaginator,
  CuisineSidebar,
  useCuisineHook
} from "@/modules/Cuisine";

const Page = () => {
  const [ showSidebar, setShowSidebar ] = useState<boolean>( false );

  
  const onClickNewBtn = () => setShowSidebar( true );

  const {
    CuisineLoading,
    CuisineHTTPRequest,
    CuisineSubmit,
    getPaginatedCuisineListFromStore,
    CuisineLayoutType,
    changeCuisineLayoutType,
    getPaginatedCuisineList,
    updateCuisineIsInitialTableDataLoaded,
    clearCuisineDataHook
  } = useCuisineHook();
  const items = getPaginatedCuisineListFromStore;
  useEffect( () => {
    /**
     * Check if store is empty, else get
     */
    if ( !items ) {
      getPaginatedCuisineList();
    }

    return () =>{
      updateCuisineIsInitialTableDataLoaded(false)
    }
  }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


  const onChangeLayout = ( type: string = "table" ) => {
    changeCuisineLayoutType( type );
  };

  return (
    <>
    
      <Sidebar
        dismissable={ false }
        className="p-sidebar-lg"
        position="right"
        visible={ showSidebar }
        onHide={ () => setShowSidebar( false ) }
        showCloseIcon={ !CuisineSubmit }
      >
        <CuisineSidebar setShowSidebar={setShowSidebar} cuisineId={null} setCuisineId={()=>{}} />
      </Sidebar>

      <CuisineToolBar
        heading={ "Cuisine" }
        newBtn={ onClickNewBtn }
        showLayoutBtns={ false }
        showSearchFilter={ true }
        changeLayout={ onChangeLayout }
        layoutType={ CuisineLayoutType }
      />
      <div className="grid">
      <div className="col-12">
            <CuisineTable
              items={ items }
              loading={ CuisineLoading }
            />
          </div>
      </div>
      <CuisinePaginator />
    </>
  );
}

export default Page