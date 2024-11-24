import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addCategoriesAction,
  updateCategoriesAction,
  getPaginatedCategoriesListAction,
  updateCategoriesPaginationAction,
  updateCategoriesPaginationFilterAction,
  deleteCategoriesAction,
  getSelectedCategoriesByIdAction,
  changeLayoutAction,
  clearCategoriesDataAction,
  updateCategoriesIsInitialTableDataLoadedAction
} from "./CategoriesAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./CategoriesEndPoints.json";

const useCategoriesHook = (props?: any) => {
  const getPaginatedCategoriesListFromStore = useSelector(
    (state: any) => state.CategoriesReducer.list,
    shallowEqual
  );

  const getCategoriesByIdFromStore = useSelector(
    (state: any) => state.CategoriesReducer.categories,
    shallowEqual
  );

  const CategoriesList = useSelector(
    (state: any) => state.CategoriesReducer.menuList,
    shallowEqual
  );
  const CategoriesLoading = useSelector(
    (state: any) => state.CategoriesReducer.loading,
    shallowEqual
  );
  const CategoriesSubmit = useSelector(
    (state: any) => state.CategoriesReducer.submitting,
    shallowEqual
  );
  const CategoriesHTTPRequest = useSelector(
    (state: any) => state.CategoriesReducer.httpRequest,
    shallowEqual
  );
  const CategoriesFilter = useSelector(
    (state: any) => state.CategoriesReducer.filter,
    shallowEqual
  );
  const CategoriesSort = useSelector(
    (state: any) => state.CategoriesReducer.sort,
    shallowEqual
  );
  const CategoriesPage = useSelector(
    (state: any) => state.CategoriesReducer.page,
    shallowEqual
  );
  const CategoriesPerPage = useSelector(
    (state: any) => state.CategoriesReducer.per_page,
    shallowEqual
  );
  const CategoriesTotalRecords = useSelector(
    (state: any) => state.CategoriesReducer.total_records,
    shallowEqual
  );

  const CategoriesIsAdded = useSelector(
    (state: any) => state.CategoriesReducer?.success,
    shallowEqual
  );

  const CategoriesIsCreated = useSelector(
    (state: any) => state.CategoriesReducer.isCreated,
    shallowEqual
  );

  const CategoriesLayoutType = useSelector(
    (state: any) => state.CategoriesReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeCategoriesLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addCategoriesAction(EndPoints.addCategories, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (CategoriesId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateCategoriesAction(EndPoints.updateCategories, CategoriesId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedCategoriesList = React.useCallback(
    () =>
      dispatch(getPaginatedCategoriesListAction(EndPoints.getPaginatedCategoriesList)),
    [dispatch]
  );

  const getSelectedCategoriesById = React.useCallback(
    (CategoriesId: any) =>
      dispatch(
        getSelectedCategoriesByIdAction(EndPoints.getSelectedCategoriesById, CategoriesId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteCategoriesAction(EndPoints.deleteCategories, rowItem)),
    [dispatch]
  );

  const clearCategoriesDataHook = React.useCallback(
    () => dispatch(clearCategoriesDataAction()),
    [dispatch]
  );

  const updateCategoriesPaginated = (sorting: any) =>
    dispatch(updateCategoriesPaginationAction(sorting));

  const updateCategoriesPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateCategoriesPaginationFilterAction(paginationData));

    const updateCategoriesIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateCategoriesIsInitialTableDataLoadedAction(status));

  return {
    CategoriesList,
    getPaginatedCategoriesListFromStore,
    CategoriesLoading,
    CategoriesSubmit,
    CategoriesHTTPRequest,
    CategoriesFilter,
    CategoriesSort,
    CategoriesPage,
    CategoriesPerPage,
    CategoriesTotalRecords,
    CategoriesIsAdded,
    CategoriesIsCreated,
    getPaginatedCategoriesList,
    saveForm,
    updateForm,
    updateCategoriesPaginated,
    updateCategoriesPaginationFilterSearch,
    deleteForm,
    getCategoriesByIdFromStore,
    getSelectedCategoriesById,
    changeCategoriesLayoutType,
    CategoriesLayoutType,
    clearCategoriesDataHook,
    updateCategoriesIsInitialTableDataLoaded,
  };
};
export { useCategoriesHook };
