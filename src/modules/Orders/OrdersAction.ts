import {
  ORDERS_LOADING,
  ORDERS_FORM_SUBMIT,
  ORDERS_ADD,
  ORDERS_DELETE,
  ORDERS_PAGNIATION_UPDATE,
  ORDERS_GET_PAGINATED_LIST,
  ORDERS_GET,
  ORDERS_LAYOUT_STYLE,
  ORDERS_UPDATE,
  ORDERS_FORM_HTTP_REQUEST,
  ORDERS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./OrdersTypes";
import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";
const OrdersLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: ORDERS_LOADING,
    payLoad,
  };
  return action;
};

const OrdersSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: ORDERS_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const OrdersHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: ORDERS_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addOrdersAction(url: string, formData: object, resetForm: () => void,isSaveAndExit:boolean, showSideBar: (status:boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    const { OrdersReducer } = getState();
    const { total_records } = OrdersReducer;

    dispatch(OrdersSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {

          resetForm();
          const action: any = {
            type: ORDERS_ADD,
            payLoad: record,
            total_records: total_records + 1,
          };
        
            dispatch(action);

            dispatch({
              type: GLOBAL_TOAST,
              payLoad: {
                showToast: true,
                toastMessage: res.data.message,
                toastDetail: null,
                toastType: "success",
              },
            });
        
          if(isSaveAndExit){
            showSideBar(false)
          }
        }
      })
      .finally(() => {
        dispatch(OrdersLoading(false));
        dispatch(OrdersSubmit(false));
   
          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: false,
              toastMessage: null,
              toastDetail: null,
              toastType: "success",
            },
          });
       
      });
  };
}

export function updateOrdersAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit:boolean, 
  showSideBar: (status:boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { OrdersReducer } = getState();
    const { list } = OrdersReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.orders_id === modelId;
    });
    dispatch(OrdersSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: ORDERS_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: ORDERS_GET,
            payLoad: {
              orders: record,
            },
          };
        
            dispatch(action);
            dispatch(updateAction);
            /**
             * For Global toast show
             */
            dispatch({
              type: GLOBAL_TOAST,
              payLoad: {
                showToast: true,
                toastMessage: res.data.message,
                toastDetail: null,
                toastType: "success",
              },
            });
          
          if(isSaveAndExit){
            showSideBar(false)
          }

        }
      })
      .finally(() => {
      
          dispatch(OrdersLoading(false));
          dispatch(OrdersSubmit(false));
          /**
           * For Global toast hide
           */
          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: false,
              toastMessage: null,
              toastDetail: null,
              toastType: "success",
            },
          });
    
      });
  };
}

export function clearOrdersDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: ORDERS_GET,
      payLoad: {
        orders: null,
      },
    };
    dispatch(action);
  };
}

export function deleteOrdersAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { OrdersReducer } = getState();
    const { total_records } = OrdersReducer;

    dispatch(OrdersLoading());
    const db = new useHttp();
    db.delete(`${url}${data.orders_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: ORDERS_DELETE,
            payLoad: data,
            total_records: total_records - 1,
          };
    
            dispatch({
              type: GLOBAL_TOAST,
              payLoad: {
                showToast: true,
                toastMessage: "Deleted",
                toastDetail: null,
                toastType: "success",
              },
            });
            dispatch(action);
          
        }
      })
      .finally(() => {
       
          dispatch(OrdersLoading(false));
          dispatch(OrdersSubmit(false));
          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: false,
              toastMessage: null,
              toastDetail: null,
              toastType: "success",
            },
          });
       
      });
  };
}

export function getPaginatedOrdersListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { OrdersReducer } = getState();
    const { page, per_page, filter, sort } = OrdersReducer;
    if (OrdersReducer.loading === true) return false;
    dispatch(OrdersLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const files = result.data.data;
        if (files?.length > 0) {
          const response: any = result.data;
          const { data, total } = response;
          const action: any = {
            type: ORDERS_GET_PAGINATED_LIST,
            payLoad: {
              list: data,
              count: data.length,
              total_records: total,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: ORDERS_GET_PAGINATED_LIST,
            payLoad: {
              list: [],
              count: 0,
              total_records: 0,
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(OrdersLoading(false));
      });
  };
}

export function getSelectedOrdersByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { OrdersReducer } = getState();

    if (OrdersReducer.loading === true) return false;
    dispatch(OrdersLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: ORDERS_GET,
            payLoad: {
              orders: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: ORDERS_GET,
            payLoad: {
              orders: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(OrdersLoading(false));
      });
  };
}

export const updateOrdersPaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
    dispatch({
      type: ORDERS_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
};

export const updateOrdersPaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
    dispatch({
      type: ORDERS_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: ORDERS_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateOrdersIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {
  
    dispatch({
      type: ORDERS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });
};
