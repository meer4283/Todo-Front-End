import {
  CUISINE_LOADING,
  CUISINE_FORM_SUBMIT,
  CUISINE_ADD,
  CUISINE_DELETE,
  CUISINE_PAGNIATION_UPDATE,
  CUISINE_GET_PAGINATED_LIST,
  CUISINE_GET,
  CUISINE_LAYOUT_STYLE,
  CUISINE_UPDATE,
  CUISINE_FORM_HTTP_REQUEST,
  CUISINE_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./CuisineTypes";


import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";

const CuisineLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: CUISINE_LOADING,
    payLoad,
  };
  return action;
};

const CuisineSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: CUISINE_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const CuisineHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: CUISINE_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addCuisineAction(url: string, formData: object, resetForm: () => void,isSaveAndExit:boolean, showSideBar: (status:boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    const { CuisineReducer } = getState();
    const { total_records } = CuisineReducer;

    dispatch(CuisineSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {

          resetForm();
          const action: any = {
            type: CUISINE_ADD,
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
        dispatch(CuisineLoading(false));
        dispatch(CuisineSubmit(false));
   
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

export function updateCuisineAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit:boolean, 
  showSideBar: (status:boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { CuisineReducer } = getState();
    const { list } = CuisineReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.cuisine_id === modelId;
    });
    dispatch(CuisineSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: CUISINE_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: CUISINE_GET,
            payLoad: {
              cuisine: record,
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
      
          dispatch(CuisineLoading(false));
          dispatch(CuisineSubmit(false));
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

export function clearCuisineDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: CUISINE_GET,
      payLoad: {
        cuisine: null,
      },
    };
    dispatch(action);
  };
}

export function deleteCuisineAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { CuisineReducer } = getState();
    const { total_records } = CuisineReducer;

    dispatch(CuisineLoading());
    const db = new useHttp();
    db.delete(`${url}${data.cuisine_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: CUISINE_DELETE,
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
       
          dispatch(CuisineLoading(false));
          dispatch(CuisineSubmit(false));
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

export function getPaginatedCuisineListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { CuisineReducer } = getState();
    const { page, per_page, filter, sort } = CuisineReducer;
    if (CuisineReducer.loading === true) return false;
    dispatch(CuisineLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const {list , pagination} = result.data;
        if (list?.length > 0) {

          const { currentPage, per_page,totalPages,totalRecords } = pagination;
          const action: any = {
            type: CUISINE_GET_PAGINATED_LIST,
            payLoad: {
              list: list,
              count: list.length,
              total_records: totalRecords,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: CUISINE_GET_PAGINATED_LIST,
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
        dispatch(CuisineLoading(false));
      });
  };
}

export function getSelectedCuisineByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { CuisineReducer } = getState();

    if (CuisineReducer.loading === true) return false;
    dispatch(CuisineLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: CUISINE_GET,
            payLoad: {
              cuisine: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: CUISINE_GET,
            payLoad: {
              cuisine: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(CuisineLoading(false));
      });
  };
}

export const updateCuisinePaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
    dispatch({
      type: CUISINE_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
};

export const updateCuisinePaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
    dispatch({
      type: CUISINE_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: CUISINE_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateCuisineIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {
  
    dispatch({
      type: CUISINE_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });
};
