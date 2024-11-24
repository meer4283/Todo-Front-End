import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addOrdersAction,
  updateOrdersAction,
  getPaginatedOrdersListAction,
  updateOrdersPaginationAction,
  updateOrdersPaginationFilterAction,
  deleteOrdersAction,
  getSelectedOrdersByIdAction,
  changeLayoutAction,
  clearOrdersDataAction,
  updateOrdersIsInitialTableDataLoadedAction
} from "./OrdersAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./OrdersEndPoints.json";

const useOrdersHook = (props?: any) => {
  const getPaginatedOrdersListFromStore = useSelector(
    (state: any) => state.OrdersReducer.list,
    shallowEqual
  );

  const getOrdersByIdFromStore = useSelector(
    (state: any) => state.OrdersReducer.orders,
    shallowEqual
  );

  const OrdersList = useSelector(
    (state: any) => state.OrdersReducer.menuList,
    shallowEqual
  );
  const OrdersLoading = useSelector(
    (state: any) => state.OrdersReducer.loading,
    shallowEqual
  );
  const OrdersSubmit = useSelector(
    (state: any) => state.OrdersReducer.submitting,
    shallowEqual
  );
  const OrdersHTTPRequest = useSelector(
    (state: any) => state.OrdersReducer.httpRequest,
    shallowEqual
  );
  const OrdersFilter = useSelector(
    (state: any) => state.OrdersReducer.filter,
    shallowEqual
  );
  const OrdersSort = useSelector(
    (state: any) => state.OrdersReducer.sort,
    shallowEqual
  );
  const OrdersPage = useSelector(
    (state: any) => state.OrdersReducer.page,
    shallowEqual
  );
  const OrdersPerPage = useSelector(
    (state: any) => state.OrdersReducer.per_page,
    shallowEqual
  );
  const OrdersTotalRecords = useSelector(
    (state: any) => state.OrdersReducer.total_records,
    shallowEqual
  );

  const OrdersIsAdded = useSelector(
    (state: any) => state.OrdersReducer?.success,
    shallowEqual
  );

  const OrdersIsCreated = useSelector(
    (state: any) => state.OrdersReducer.isCreated,
    shallowEqual
  );

  const OrdersLayoutType = useSelector(
    (state: any) => state.OrdersReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeOrdersLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addOrdersAction(EndPoints.addOrders, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (OrdersId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateOrdersAction(EndPoints.updateOrders, OrdersId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedOrdersList = React.useCallback(
    () =>
      dispatch(getPaginatedOrdersListAction(EndPoints.getPaginatedOrdersList)),
    [dispatch]
  );

  const getSelectedOrdersById = React.useCallback(
    (OrdersId: any) =>
      dispatch(
        getSelectedOrdersByIdAction(EndPoints.getSelectedOrdersById, OrdersId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteOrdersAction(EndPoints.deleteOrders, rowItem)),
    [dispatch]
  );

  const clearOrdersDataHook = React.useCallback(
    () => dispatch(clearOrdersDataAction()),
    [dispatch]
  );

  const updateOrdersPaginated = (sorting: any) =>
    dispatch(updateOrdersPaginationAction(sorting));

  const updateOrdersPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateOrdersPaginationFilterAction(paginationData));

    const updateOrdersIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateOrdersIsInitialTableDataLoadedAction(status));

  return {
    OrdersList,
    getPaginatedOrdersListFromStore,
    OrdersLoading,
    OrdersSubmit,
    OrdersHTTPRequest,
    OrdersFilter,
    OrdersSort,
    OrdersPage,
    OrdersPerPage,
    OrdersTotalRecords,
    OrdersIsAdded,
    OrdersIsCreated,
    getPaginatedOrdersList,
    saveForm,
    updateForm,
    updateOrdersPaginated,
    updateOrdersPaginationFilterSearch,
    deleteForm,
    getOrdersByIdFromStore,
    getSelectedOrdersById,
    changeOrdersLayoutType,
    OrdersLayoutType,
    clearOrdersDataHook,
    updateOrdersIsInitialTableDataLoaded,
  };
};
export { useOrdersHook };
