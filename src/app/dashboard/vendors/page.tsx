"use client"
import React, { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  VendorsToolBar,
  VendorsTable,
  VendorsPaginator,
  VendorsSidebar,
  useVendorsHook
} from "@/modules/Vendors";

const Page = () => {
 
  const [ showSidebar, setShowSidebar ] = useState<boolean>( false );

  
  const onClickNewBtn = () => setShowSidebar( true );

  const {
    VendorsLoading,
    VendorsHTTPRequest,
    VendorsSubmit,
    getPaginatedVendorsListFromStore,
    VendorsLayoutType,
    changeVendorsLayoutType,
    getPaginatedVendorsList,
    updateVendorsIsInitialTableDataLoaded,
    clearVendorsDataHook
  } = useVendorsHook();
  const items = getPaginatedVendorsListFromStore;
  useEffect( () => {
    /**
     * Check if store is empty, else get
     */
    if ( !items ) {
      getPaginatedVendorsList();
    }

    return () =>{
      updateVendorsIsInitialTableDataLoaded(false)
    }
  }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


  const onChangeLayout = ( type: string = "table" ) => {
    changeVendorsLayoutType( type );
  };

  return (
    <>
    
      <Sidebar
        dismissable={ false }
        className="p-sidebar-lg"
        position="right"
        visible={ showSidebar }
        onHide={ () => setShowSidebar( false ) }
        showCloseIcon={ !VendorsSubmit }
      >
        <VendorsSidebar setShowSidebar={setShowSidebar} vendorsId={null} setVendorsId={()=>{}} />
      </Sidebar>

      <VendorsToolBar
        heading={ "Vendors" }
        newBtn={ onClickNewBtn }
        showLayoutBtns={ false }
        showSearchFilter={ true }
        changeLayout={ onChangeLayout }
        layoutType={ VendorsLayoutType }
      />
      <div className="grid">
      <div className="col-12">
            <VendorsTable
              items={ items }
              loading={ VendorsLoading }
            />
          </div>
      </div>
      <VendorsPaginator />
    </>
  );
}

export default Page