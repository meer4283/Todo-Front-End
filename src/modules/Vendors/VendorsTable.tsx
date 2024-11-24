import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useVendorsHook } from "./VendorsHook";
import { confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React,{ useState } from "react";
import { VendorsSidebar } from "./VendorsSidebar";
import { useTranslation } from 'react-i18next';
import { VendorsModal } from "./VendorsModal";
import { Dialog } from "primereact/dialog";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";


export const VendorsTable = ( props: any ) => {
  const { items, loading,  } = props;

  const { deleteForm, clearVendorsDataHook, VendorsLoading, VendorsSubmit,} = useVendorsHook();
  const [ showModal, setShowModal ] = useState<boolean>( false );
  const [ showVendorsItemViewSidebar, setShowVendorsItemViewSidebar ] = useState<boolean>(
    false
  );

  const [ vendorsId, setVendorsId ] = useState<any>();
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
            setVendorsId( row?.vendors_id );
            setShowVendorsItemViewSidebar( true );
          } }
          icon="pi pi-pencil"
        ></Button>

      <Button
       text
          type="button"
          className="p-button-info "
          onClick={ () => {
            setVendorsId( row?.vendors_id );
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
      header="Vendors"
      visible={showModal}
      style={{ width: "50vw" }}
      footer={() => (
        <>
        <Button label="Close" className="p-button-danger" onClick={() => setShowModal(false)} />
          
        </>
      )}
      >
          {/* <VendorsModal /> */}
      </Dialog>

      <Sidebar
            dismissable={ false }
            className="p-sidebar-lg"
            position="right"
            visible={ showVendorsItemViewSidebar }
            onHide={ () => setShowVendorsItemViewSidebar( false ) }
            showCloseIcon={ !VendorsSubmit }
          >
            <VendorsSidebar
              vendorsId={ vendorsId }
              setVendorsId={ setVendorsId }
              setShowSidebar={ setShowVendorsItemViewSidebar }
            />
          </Sidebar>
      <div>
        <div>


         

          { !loading ? (
            <DataTable value={ items } scrollable scrollHeight="calc(100vh - 350px)"
            >
              <Column
                style={ { width: "10%" } }
                field="vendor_id"
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
                field="store_name"
                header={t('Vendors Title')}
                className="font-bold"
              ></Column>

<Column
                style={ { width: "10%" } }
                field="store_address"
                header={t('Address')}
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
                { field: "vendors_id", header: "ID" },
                { field: "created_at", header: t('Created') },
              ] }
            />
          ) }
        </div>
      </div>
    </>
  );
};
