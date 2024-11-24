import {
  DISH_LOADING,
  DISH_FORM_SUBMIT,
  DISH_ADD,
  DISH_DELETE,
  DISH_PAGNIATION_UPDATE,
  DISH_GET_PAGINATED_LIST,
  DISH_GET,
  DISH_LAYOUT_STYLE,
  DISH_UPDATE,
  DISH_FORM_HTTP_REQUEST,
  DISH_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./DishTypes";
import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";

const DishLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: DISH_LOADING,
    payLoad,
  };
  return action;
};

const DishSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: DISH_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const DishHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: DISH_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addDishAction(url: string, formData: object, resetForm: () => void,isSaveAndExit:boolean, showSideBar: (status:boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    const { DishReducer } = getState();
    const { total_records } = DishReducer;

    dispatch(DishSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {

          resetForm();
          const action: any = {
            type: DISH_ADD,
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
        dispatch(DishLoading(false));
        dispatch(DishSubmit(false));
   
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

export function updateDishAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit:boolean, 
  showSideBar: (status:boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { DishReducer } = getState();
    const { list } = DishReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.dish_id === modelId;
    });
    dispatch(DishSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: DISH_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: DISH_GET,
            payLoad: {
              dish: record,
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
      
          dispatch(DishLoading(false));
          dispatch(DishSubmit(false));
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

export function clearDishDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: DISH_GET,
      payLoad: {
        dish: null,
      },
    };
    dispatch(action);
  };
}

export function deleteDishAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { DishReducer } = getState();
    const { total_records } = DishReducer;

    dispatch(DishLoading());
    const db = new useHttp();
    db.delete(`${url}${data.dish_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: DISH_DELETE,
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
       
          dispatch(DishLoading(false));
          dispatch(DishSubmit(false));
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

export function getPaginatedDishListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { DishReducer } = getState();
    const { page, per_page, filter, sort } = DishReducer;
    if (DishReducer.loading === true) return false;
    dispatch(DishLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const {list , pagination} = result.data;
        if (list?.length > 0) {

          const { currentPage, per_page,totalPages,totalRecords } = pagination;
          const action: any = {
            type: DISH_GET_PAGINATED_LIST,
            payLoad: {
              list: list,
              count: list.length,
              total_records: totalRecords,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: DISH_GET_PAGINATED_LIST,
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
        dispatch(DishLoading(false));
      });
  };
}

export function getSelectedDishByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { DishReducer } = getState();

    if (DishReducer.loading === true) return false;
    dispatch(DishLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: DISH_GET,
            payLoad: {
              dish: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: DISH_GET,
            payLoad: {
              dish: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(DishLoading(false));
      });
  };
}

export const updateDishPaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
    dispatch({
      type: DISH_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
};

export const updateDishPaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
    dispatch({
      type: DISH_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: DISH_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateDishIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {
  
    dispatch({
      type: DISH_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });
};
