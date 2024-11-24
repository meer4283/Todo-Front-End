import {
  VENDORS_LOADING,
  VENDORS_FORM_SUBMIT,
  VENDORS_ADD,
  VENDORS_DELETE,
  VENDORS_PAGNIATION_UPDATE,
  VENDORS_GET_PAGINATED_LIST,
  VENDORS_GET,
  VENDORS_LAYOUT_STYLE,
  VENDORS_UPDATE,
  VENDORS_FORM_HTTP_REQUEST,
  VENDORS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./VendorsTypes";
import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";
const VendorsLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: VENDORS_LOADING,
    payLoad,
  };
  return action;
};

const VendorsSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: VENDORS_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const VendorsHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: VENDORS_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addVendorsAction(url: string, formData: object, resetForm: () => void,isSaveAndExit:boolean, showSideBar: (status:boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    const { VendorsReducer } = getState();
    const { total_records } = VendorsReducer;

    dispatch(VendorsSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {

          resetForm();
          const action: any = {
            type: VENDORS_ADD,
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
        dispatch(VendorsLoading(false));
        dispatch(VendorsSubmit(false));
   
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

export function updateVendorsAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit:boolean, 
  showSideBar: (status:boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { VendorsReducer } = getState();
    const { list } = VendorsReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.vendors_id === modelId;
    });
    dispatch(VendorsSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: VENDORS_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: VENDORS_GET,
            payLoad: {
              vendors: record,
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
      
          dispatch(VendorsLoading(false));
          dispatch(VendorsSubmit(false));
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

export function clearVendorsDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: VENDORS_GET,
      payLoad: {
        vendors: null,
      },
    };
    dispatch(action);
  };
}

export function deleteVendorsAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { VendorsReducer } = getState();
    const { total_records } = VendorsReducer;

    dispatch(VendorsLoading());
    const db = new useHttp();
    db.delete(`${url}${data.vendors_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: VENDORS_DELETE,
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
       
          dispatch(VendorsLoading(false));
          dispatch(VendorsSubmit(false));
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

export function getPaginatedVendorsListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { VendorsReducer } = getState();
    const { page, per_page, filter, sort } = VendorsReducer;
    if (VendorsReducer.loading === true) return false;
    dispatch(VendorsLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const {list , pagination} = result.data;
        if (list?.length > 0) {

          const { currentPage, per_page,totalPages,totalRecords } = pagination;
          const action: any = {
            type: VENDORS_GET_PAGINATED_LIST,
            payLoad: {
              list: list,
              count: list.length,
              total_records: totalRecords,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: VENDORS_GET_PAGINATED_LIST,
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
        dispatch(VendorsLoading(false));
      });
  };
}

export function getSelectedVendorsByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { VendorsReducer } = getState();

    if (VendorsReducer.loading === true) return false;
    dispatch(VendorsLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: VENDORS_GET,
            payLoad: {
              vendors: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: VENDORS_GET,
            payLoad: {
              vendors: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(VendorsLoading(false));
      });
  };
}

export const updateVendorsPaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
    dispatch({
      type: VENDORS_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
};

export const updateVendorsPaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
    dispatch({
      type: VENDORS_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: VENDORS_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateVendorsIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {
  
    dispatch({
      type: VENDORS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });
};
