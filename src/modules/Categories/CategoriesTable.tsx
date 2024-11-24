import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { useCategoriesHook } from "./CategoriesHook";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import React,{ useState } from "react";
import { CategoriesSidebar } from "./CategoriesSidebar";
import { useTranslation } from 'react-i18next';
import { CategoriesModal } from "./CategoriesModal";
import { Dialog } from "primereact/dialog";
import { DataTableSkeleton } from "@/component/Skeleton/DataTableSkeleton";

export const CategoriesTable = ( props: any ) => {
  const { items, loading,  } = props;

  const { deleteForm, clearCategoriesDataHook, CategoriesLoading, CategoriesSubmit,} = useCategoriesHook();
  const [ showModal, setShowModal ] = useState<boolean>( false );
  const [ showCategoriesItemViewSidebar, setShowCategoriesItemViewSidebar ] = useState<boolean>(
    false
  );

  const [ categoriesId, setCategoriesId ] = useState<any>();
  const { t, i18n } = useTranslation();

  const deleteRowHandler = ( row: any ) => {
    confirmDialog( {
      message: t('Do you want to delete this record?'),
      header: t('Delete Confirmation'),
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
            setCategoriesId( row?.categories_id );
            setShowCategoriesItemViewSidebar( true );
          } }
          icon="pi pi-pencil"
        ></Button>

      <Button
       text
          type="button"
          className="p-button-info "
          onClick={ () => {
            setCategoriesId( row?.categories_id );
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
      header="Categories"
      visible={showModal}
      style={{ width: "50vw" }}
      footer={() => (
        <>
        <Button label="Close" className="p-button-danger" onClick={() => setShowModal(false)} />
          
        </>
      )}
      >
          <CategoriesModal />
      </Dialog>
      <ConfirmDialog />
      <Sidebar
            dismissable={ false }
            className="p-sidebar-lg"
            position="right"
            visible={ showCategoriesItemViewSidebar }
            onHide={ () => setShowCategoriesItemViewSidebar( false ) }
            showCloseIcon={ !CategoriesSubmit }
          >
            <CategoriesSidebar
              categoriesId={ categoriesId }
              setCategoriesId={ setCategoriesId }
              setShowSidebar={ setShowCategoriesItemViewSidebar }
            />
          </Sidebar>
      <div>
        <div>


         

          { !loading ? (
            <DataTable value={ items } scrollable scrollHeight="calc(100vh - 350px)"
            >
              <Column
                style={ { width: "10%" } }
                field="category_id"
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
                field="category_name"
                header={t('Categories Title')}
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
                { field: "categories_id", header: "ID" },
                { field: "created_at", header: t('Created') },
              ] }
            />
          ) }
        </div>
      </div>
    </>
  );
};
