import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useOrdersHook } from "./OrdersHook";
import { confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React,{ useState } from "react";
import { OrdersSidebar } from "./OrdersSidebar";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";
import { useTranslation } from 'react-i18next';
import { OrdersModal } from "./OrdersModal";
import { Dialog } from "primereact/dialog";


export const OrdersTable = ( props: any ) => {
  const { items, loading,  } = props;

  const { deleteForm, clearOrdersDataHook, OrdersLoading, OrdersSubmit,} = useOrdersHook();
  const [ showModal, setShowModal ] = useState<boolean>( false );
  const [ showOrdersItemViewSidebar, setShowOrdersItemViewSidebar ] = useState<boolean>(
    false
  );

  const [ ordersId, setOrdersId ] = useState<any>();
  const { t, i18n } = useTranslation();

  const deleteRowHandler = ( row: any ) => {
    confirmDialog( {
      message: t('Do you want to delete this record?'),
      header: t('Delete confirmation'),
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteForm( row );
      },
      reject: () => { },
    } );
  };

  const actionBodyTemplate = ( row: any ) => {
    return (
      <>
        <Button
        text
          type="button"
          className="p-button-info "
          onClick={ () => {
            setOrdersId( row?.orders_id );
            setShowOrdersItemViewSidebar( true );
          } }
          icon="pi pi-pencil"
        ></Button>

      <Button
       text
          type="button"
          className="p-button-info "
          onClick={ () => {
            setOrdersId( row?.orders_id );
            setShowModal( true );
          } }
          icon="pi pi-eye"
        ></Button>

        <Button
         text
          type="button"
          className="p-button-danger left-space"
          onClick={ () => deleteRowHandler( row ) }
          icon="pi pi-trash"
        ></Button>
      </>
    );
  };

  return (
    <>
      <Dialog
      maximizable
      onHide={()=>{setShowModal(false)}}
      header="Orders"
      visible={showModal}
      style={{ width: "50vw" }}
      footer={() => (
        <>
        <Button label="Close" className="p-button-danger" onClick={() => setShowModal(false)} />
          
        </>
      )}
      >
          {/* <OrdersModal /> */}
      </Dialog>

      <Sidebar
            dismissable={ false }
            className="p-sidebar-lg"
            position="right"
            visible={ showOrdersItemViewSidebar }
            onHide={ () => setShowOrdersItemViewSidebar( false ) }
            showCloseIcon={ !OrdersSubmit }
          >
            <OrdersSidebar
              ordersId={ ordersId }
              setOrdersId={ setOrdersId }
              setShowSidebar={ setShowOrdersItemViewSidebar }
            />
          </Sidebar>
      <div>
        <div>


         

          { !loading ? (
            <DataTable value={ items } scrollable scrollHeight="calc(100vh - 350px)"
            >
              <Column
                style={ { width: "10%" } }
                field="orders_id"
                header={t('ID')}
                sortable
              ></Column>

              <Column
                style={ { width: "10%" } }
                field="created_at"
                header={t('Created')}
                body={ ( row ) => (
                  <>{ moment( row?.created_at ).format( "Do MMM YYYY HH:mm" ) }</>
                ) }
                sortable
              ></Column>

              <Column
                style={ { width: "10%" } }
                field="orders_title"
                header={t('Orders Title')}
                className="font-bold"
            
              ></Column>



              <Column
                style={ { width: "10%" } }
                headerStyle={ { textAlign: "center" } }
                bodyStyle={ { textAlign: "left", overflow: "visible" } }
                body={ ( e ) => actionBodyTemplate( e ) }
              />
            </DataTable>
          ) : (
            <DataTableSkeleton
              noOfRows={ 15 }
              columns={ [
                { field: "orders_id", header: "ID" },
                { field: "created_at", header: t('Created') },
              ] }
            />
          ) }
        </div>
      </div>
    </>
  );
};
