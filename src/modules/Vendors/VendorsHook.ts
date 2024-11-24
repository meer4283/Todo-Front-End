import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addVendorsAction,
  updateVendorsAction,
  getPaginatedVendorsListAction,
  updateVendorsPaginationAction,
  updateVendorsPaginationFilterAction,
  deleteVendorsAction,
  getSelectedVendorsByIdAction,
  changeLayoutAction,
  clearVendorsDataAction,
  updateVendorsIsInitialTableDataLoadedAction
} from "./VendorsAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./VendorsEndPoints.json";

const useVendorsHook = (props?: any) => {
  const getPaginatedVendorsListFromStore = useSelector(
    (state: any) => state.VendorsReducer.list,
    shallowEqual
  );

  const getVendorsByIdFromStore = useSelector(
    (state: any) => state.VendorsReducer.vendors,
    shallowEqual
  );

  const VendorsList = useSelector(
    (state: any) => state.VendorsReducer.menuList,
    shallowEqual
  );
  const VendorsLoading = useSelector(
    (state: any) => state.VendorsReducer.loading,
    shallowEqual
  );
  const VendorsSubmit = useSelector(
    (state: any) => state.VendorsReducer.submitting,
    shallowEqual
  );
  const VendorsHTTPRequest = useSelector(
    (state: any) => state.VendorsReducer.httpRequest,
    shallowEqual
  );
  const VendorsFilter = useSelector(
    (state: any) => state.VendorsReducer.filter,
    shallowEqual
  );
  const VendorsSort = useSelector(
    (state: any) => state.VendorsReducer.sort,
    shallowEqual
  );
  const VendorsPage = useSelector(
    (state: any) => state.VendorsReducer.page,
    shallowEqual
  );
  const VendorsPerPage = useSelector(
    (state: any) => state.VendorsReducer.per_page,
    shallowEqual
  );
  const VendorsTotalRecords = useSelector(
    (state: any) => state.VendorsReducer.total_records,
    shallowEqual
  );

  const VendorsIsAdded = useSelector(
    (state: any) => state.VendorsReducer?.success,
    shallowEqual
  );

  const VendorsIsCreated = useSelector(
    (state: any) => state.VendorsReducer.isCreated,
    shallowEqual
  );

  const VendorsLayoutType = useSelector(
    (state: any) => state.VendorsReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeVendorsLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addVendorsAction(EndPoints.addVendors, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (VendorsId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateVendorsAction(EndPoints.updateVendors, VendorsId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedVendorsList = React.useCallback(
    () =>
      dispatch(getPaginatedVendorsListAction(EndPoints.getPaginatedVendorsList)),
    [dispatch]
  );

  const getSelectedVendorsById = React.useCallback(
    (VendorsId: any) =>
      dispatch(
        getSelectedVendorsByIdAction(EndPoints.getSelectedVendorsById, VendorsId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteVendorsAction(EndPoints.deleteVendors, rowItem)),
    [dispatch]
  );

  const clearVendorsDataHook = React.useCallback(
    () => dispatch(clearVendorsDataAction()),
    [dispatch]
  );

  const updateVendorsPaginated = (sorting: any) =>
    dispatch(updateVendorsPaginationAction(sorting));

  const updateVendorsPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateVendorsPaginationFilterAction(paginationData));

    const updateVendorsIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateVendorsIsInitialTableDataLoadedAction(status));

  return {
    VendorsList,
    getPaginatedVendorsListFromStore,
    VendorsLoading,
    VendorsSubmit,
    VendorsHTTPRequest,
    VendorsFilter,
    VendorsSort,
    VendorsPage,
    VendorsPerPage,
    VendorsTotalRecords,
    VendorsIsAdded,
    VendorsIsCreated,
    getPaginatedVendorsList,
    saveForm,
    updateForm,
    updateVendorsPaginated,
    updateVendorsPaginationFilterSearch,
    deleteForm,
    getVendorsByIdFromStore,
    getSelectedVendorsById,
    changeVendorsLayoutType,
    VendorsLayoutType,
    clearVendorsDataHook,
    updateVendorsIsInitialTableDataLoaded,
  };
};
export { useVendorsHook };
