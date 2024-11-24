"use client"
import { useCategoriesHook, CategoriesSidebar, CategoriesToolBar, CategoriesTable, CategoriesPaginator } from '@/modules/Categories';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [ showSidebar, setShowSidebar ] = useState<boolean>( false );

  
  const onClickNewBtn = () => setShowSidebar( true );

  const {
    CategoriesLoading,
    CategoriesHTTPRequest,
    CategoriesSubmit,
    getPaginatedCategoriesListFromStore,
    CategoriesLayoutType,
    changeCategoriesLayoutType,
    getPaginatedCategoriesList,
    updateCategoriesIsInitialTableDataLoaded,
    clearCategoriesDataHook
  } = useCategoriesHook();
  const items = getPaginatedCategoriesListFromStore;
  useEffect( () => {
    /**
     * Check if store is empty, else get
     */
    if ( !items ) {
      getPaginatedCategoriesList();
    }

    return () =>{
      updateCategoriesIsInitialTableDataLoaded(false)
    }
  }, [] ); // eslint-disable-line react-hooks/exhaustive-deps


  const onChangeLayout = ( type: string = "table" ) => {
    changeCategoriesLayoutType( type );
  };

  return (
    <>
    
      <Sidebar
        dismissable={ false }
        className="p-sidebar-lg"
        position="right"
        visible={ showSidebar }
        onHide={ () => setShowSidebar( false ) }
        showCloseIcon={ !CategoriesSubmit }
      >
        <CategoriesSidebar setShowSidebar={setShowSidebar} categoriesId={null} setCategoriesId={()=>{}} />
      </Sidebar>

      <CategoriesToolBar
        heading={ "Categories" }
        newBtn={ onClickNewBtn }
        showLayoutBtns={ false }
        showSearchFilter={ true }
        changeLayout={ onChangeLayout }
        layoutType={ CategoriesLayoutType }
      />
      <div className="grid">
      <div className="col-12">
            <CategoriesTable
              items={ items }
              loading={ CategoriesLoading }
            />
          </div>
      </div>
      <CategoriesPaginator />
    </>
  );
}

export default Page