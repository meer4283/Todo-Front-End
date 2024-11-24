import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addDishAction,
  updateDishAction,
  getPaginatedDishListAction,
  updateDishPaginationAction,
  updateDishPaginationFilterAction,
  deleteDishAction,
  getSelectedDishByIdAction,
  changeLayoutAction,
  clearDishDataAction,
  updateDishIsInitialTableDataLoadedAction
} from "./DishAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./DishEndPoints.json";

const useDishHook = (props?: any) => {
  const getPaginatedDishListFromStore = useSelector(
    (state: any) => state.DishReducer.list,
    shallowEqual
  );

  const getDishByIdFromStore = useSelector(
    (state: any) => state.DishReducer.dish,
    shallowEqual
  );

  const DishList = useSelector(
    (state: any) => state.DishReducer.menuList,
    shallowEqual
  );
  const DishLoading = useSelector(
    (state: any) => state.DishReducer.loading,
    shallowEqual
  );
  const DishSubmit = useSelector(
    (state: any) => state.DishReducer.submitting,
    shallowEqual
  );
  const DishHTTPRequest = useSelector(
    (state: any) => state.DishReducer.httpRequest,
    shallowEqual
  );
  const DishFilter = useSelector(
    (state: any) => state.DishReducer.filter,
    shallowEqual
  );
  const DishSort = useSelector(
    (state: any) => state.DishReducer.sort,
    shallowEqual
  );
  const DishPage = useSelector(
    (state: any) => state.DishReducer.page,
    shallowEqual
  );
  const DishPerPage = useSelector(
    (state: any) => state.DishReducer.per_page,
    shallowEqual
  );
  const DishTotalRecords = useSelector(
    (state: any) => state.DishReducer.total_records,
    shallowEqual
  );

  const DishIsAdded = useSelector(
    (state: any) => state.DishReducer?.success,
    shallowEqual
  );

  const DishIsCreated = useSelector(
    (state: any) => state.DishReducer.isCreated,
    shallowEqual
  );

  const DishLayoutType = useSelector(
    (state: any) => state.DishReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeDishLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addDishAction(EndPoints.addDish, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (DishId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateDishAction(EndPoints.updateDish, DishId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedDishList = React.useCallback(
    () =>
      dispatch(getPaginatedDishListAction(EndPoints.getPaginatedDishList)),
    [dispatch]
  );

  const getSelectedDishById = React.useCallback(
    (DishId: any) =>
      dispatch(
        getSelectedDishByIdAction(EndPoints.getSelectedDishById, DishId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteDishAction(EndPoints.deleteDish, rowItem)),
    [dispatch]
  );

  const clearDishDataHook = React.useCallback(
    () => dispatch(clearDishDataAction()),
    [dispatch]
  );

  const updateDishPaginated = (sorting: any) =>
    dispatch(updateDishPaginationAction(sorting));

  const updateDishPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateDishPaginationFilterAction(paginationData));

    const updateDishIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateDishIsInitialTableDataLoadedAction(status));

  return {
    DishList,
    getPaginatedDishListFromStore,
    DishLoading,
    DishSubmit,
    DishHTTPRequest,
    DishFilter,
    DishSort,
    DishPage,
    DishPerPage,
    DishTotalRecords,
    DishIsAdded,
    DishIsCreated,
    getPaginatedDishList,
    saveForm,
    updateForm,
    updateDishPaginated,
    updateDishPaginationFilterSearch,
    deleteForm,
    getDishByIdFromStore,
    getSelectedDishById,
    changeDishLayoutType,
    DishLayoutType,
    clearDishDataHook,
    updateDishIsInitialTableDataLoaded,
  };
};
export { useDishHook };
