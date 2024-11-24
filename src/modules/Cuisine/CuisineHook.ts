import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addCuisineAction,
  updateCuisineAction,
  getPaginatedCuisineListAction,
  updateCuisinePaginationAction,
  updateCuisinePaginationFilterAction,
  deleteCuisineAction,
  getSelectedCuisineByIdAction,
  changeLayoutAction,
  clearCuisineDataAction,
  updateCuisineIsInitialTableDataLoadedAction
} from "./CuisineAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./CuisineEndPoints.json";

const useCuisineHook = (props?: any) => {
  const getPaginatedCuisineListFromStore = useSelector(
    (state: any) => state.CuisineReducer.list,
    shallowEqual
  );

  const getCuisineByIdFromStore = useSelector(
    (state: any) => state.CuisineReducer.cuisine,
    shallowEqual
  );

  const CuisineList = useSelector(
    (state: any) => state.CuisineReducer.menuList,
    shallowEqual
  );
  const CuisineLoading = useSelector(
    (state: any) => state.CuisineReducer.loading,
    shallowEqual
  );
  const CuisineSubmit = useSelector(
    (state: any) => state.CuisineReducer.submitting,
    shallowEqual
  );
  const CuisineHTTPRequest = useSelector(
    (state: any) => state.CuisineReducer.httpRequest,
    shallowEqual
  );
  const CuisineFilter = useSelector(
    (state: any) => state.CuisineReducer.filter,
    shallowEqual
  );
  const CuisineSort = useSelector(
    (state: any) => state.CuisineReducer.sort,
    shallowEqual
  );
  const CuisinePage = useSelector(
    (state: any) => state.CuisineReducer.page,
    shallowEqual
  );
  const CuisinePerPage = useSelector(
    (state: any) => state.CuisineReducer.per_page,
    shallowEqual
  );
  const CuisineTotalRecords = useSelector(
    (state: any) => state.CuisineReducer.total_records,
    shallowEqual
  );

  const CuisineIsAdded = useSelector(
    (state: any) => state.CuisineReducer?.success,
    shallowEqual
  );

  const CuisineIsCreated = useSelector(
    (state: any) => state.CuisineReducer.isCreated,
    shallowEqual
  );

  const CuisineLayoutType = useSelector(
    (state: any) => state.CuisineReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeCuisineLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addCuisineAction(EndPoints.addCuisine, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (CuisineId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateCuisineAction(EndPoints.updateCuisine, CuisineId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedCuisineList = React.useCallback(
    () =>
      dispatch(getPaginatedCuisineListAction(EndPoints.getPaginatedCuisineList)),
    [dispatch]
  );

  const getSelectedCuisineById = React.useCallback(
    (CuisineId: any) =>
      dispatch(
        getSelectedCuisineByIdAction(EndPoints.getSelectedCuisineById, CuisineId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteCuisineAction(EndPoints.deleteCuisine, rowItem)),
    [dispatch]
  );

  const clearCuisineDataHook = React.useCallback(
    () => dispatch(clearCuisineDataAction()),
    [dispatch]
  );

  const updateCuisinePaginated = (sorting: any) =>
    dispatch(updateCuisinePaginationAction(sorting));

  const updateCuisinePaginationFilterSearch = (paginationData: any) =>
    dispatch(updateCuisinePaginationFilterAction(paginationData));

    const updateCuisineIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateCuisineIsInitialTableDataLoadedAction(status));

  return {
    CuisineList,
    getPaginatedCuisineListFromStore,
    CuisineLoading,
    CuisineSubmit,
    CuisineHTTPRequest,
    CuisineFilter,
    CuisineSort,
    CuisinePage,
    CuisinePerPage,
    CuisineTotalRecords,
    CuisineIsAdded,
    CuisineIsCreated,
    getPaginatedCuisineList,
    saveForm,
    updateForm,
    updateCuisinePaginated,
    updateCuisinePaginationFilterSearch,
    deleteForm,
    getCuisineByIdFromStore,
    getSelectedCuisineById,
    changeCuisineLayoutType,
    CuisineLayoutType,
    clearCuisineDataHook,
    updateCuisineIsInitialTableDataLoaded,
  };
};
export { useCuisineHook };
