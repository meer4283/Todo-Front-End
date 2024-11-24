"use client"
import React, { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  OrdersToolBar,
  OrdersTable,
  OrdersPaginator,
  OrdersSidebar,
  useOrdersHook
} from "@/modules/Orders";

const Page = () => {
  
  const [ showSidebar, setShowSidebar ] = useState<boolean>( false );

  
  const onClickNewBtn = () => setShowSidebar( true );

  const {
    OrdersLoading,
    OrdersHTTPRequest,
    OrdersSubmit,
    getPaginatedOrdersListFromStore,
    OrdersLayoutType,
    changeOrdersLayoutType,
    getPaginatedOrdersList,
    updateOrdersIsInitialTableDataLoaded,
    clearOrdersDataHook
  } = useOrdersHook();
  const items = getPaginatedOrdersListFromStore;
  useEffect( () => {
    /**
     * Check if store is empty, else get
     */
    if ( !items ) {
      getPaginatedOrdersList();
    }

    return () =>{
      updateOrdersIsInitialTableDataLoaded(false)
    }
  }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


  const onChangeLayout = ( type: string = "table" ) => {
    changeOrdersLayoutType( type );
  };

  return (
    <>
    
      <Sidebar
        dismissable={ false }
        className="p-sidebar-lg"
        position="right"
        visible={ showSidebar }
        onHide={ () => setShowSidebar( false ) }
        showCloseIcon={ !OrdersSubmit }
      >
        <OrdersSidebar setShowSidebar={setShowSidebar} ordersId={null} setOrdersId={()=>{}} />
      </Sidebar>

      <OrdersToolBar
        heading={ "Orders" }
        newBtn={ onClickNewBtn }
        showLayoutBtns={ false }
        showSearchFilter={ true }
        changeLayout={ onChangeLayout }
        layoutType={ OrdersLayoutType }
      />
      <div className="grid">
      <div className="col-12">
            <OrdersTable
              items={ items }
              loading={ OrdersLoading }
            />
          </div>
      </div>
      <OrdersPaginator />
    </>
  );
}

export default Page