"use client"
import React, { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  DishToolBar,
  DishTable,
  DishPaginator,
  DishSidebar,
  useDishHook
} from "@/modules/Dish";

const Page = () => {
  const [ showSidebar, setShowSidebar ] = useState<boolean>( false );

  
  const onClickNewBtn = () => setShowSidebar( true );

  const {
    DishLoading,
    DishHTTPRequest,
    DishSubmit,
    getPaginatedDishListFromStore,
    DishLayoutType,
    changeDishLayoutType,
    getPaginatedDishList,
    updateDishIsInitialTableDataLoaded,
    clearDishDataHook
  } = useDishHook();
  const items = getPaginatedDishListFromStore;
  useEffect( () => {
    /**
     * Check if store is empty, else get
     */
    if ( !items ) {
      getPaginatedDishList();
    }

    return () =>{
      updateDishIsInitialTableDataLoaded(false)
    }
  }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


  const onChangeLayout = ( type: string = "table" ) => {
    changeDishLayoutType( type );
  };

  return (
    <>
    
      <Sidebar
        dismissable={ false }
        className="p-sidebar-lg"
        position="right"
        visible={ showSidebar }
        onHide={ () => setShowSidebar( false ) }
        showCloseIcon={ !DishSubmit }
      >
        <DishSidebar setShowSidebar={setShowSidebar} dishId={null} setDishId={()=>{}} />
      </Sidebar>

      <DishToolBar
        heading={ "Dish" }
        newBtn={ onClickNewBtn }
        showLayoutBtns={ false }
        showSearchFilter={ true }
        changeLayout={ onChangeLayout }
        layoutType={ DishLayoutType }
      />
      <div className="grid">
      <div className="col-12">
            <DishTable
              items={ items }
              loading={ DishLoading }
            />
          </div>
      </div>
      <DishPaginator />
    </>
  );
}

export default Page