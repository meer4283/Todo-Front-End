import {
  TODO_TASK_LOADING,
  TODO_TASK_FORM_SUBMIT,
  TODO_TASK_ADD,
  TODO_TASK_DELETE,
  TODO_TASK_PAGNIATION_UPDATE,
  TODO_TASK_GET_PAGINATED_LIST,
  TODO_TASK_GET,
  TODO_TASK_LAYOUT_STYLE,
  TODO_TASK_UPDATE,
  TODO_TASK_FORM_HTTP_REQUEST,
  TODO_TASK_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./TodoTaskTypes";

import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";

const TodoTaskLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: TODO_TASK_LOADING,
    payLoad,
  };
  return action;
};

const TodoTaskSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: TODO_TASK_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const TodoTaskHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: TODO_TASK_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addTodoTaskAction(url: string, formData: object, resetForm: () => void,isSaveAndExit:boolean, showSideBar: (status:boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    const { TodoTaskReducer } = getState();
    const { total_records } = TodoTaskReducer;

    dispatch(TodoTaskSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {

          resetForm();
          const action: any = {
            type: TODO_TASK_ADD,
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
        dispatch(TodoTaskLoading(false));
        dispatch(TodoTaskSubmit(false));
   
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

export function updateTodoTaskAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit:boolean, 
  showSideBar: (status:boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { TodoTaskReducer } = getState();
    const { list } = TodoTaskReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.todo_task_id === modelId;
    });
    dispatch(TodoTaskSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: TODO_TASK_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: TODO_TASK_GET,
            payLoad: {
              todoTask: record,
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
      
          dispatch(TodoTaskLoading(false));
          dispatch(TodoTaskSubmit(false));
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

export function clearTodoTaskDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: TODO_TASK_GET,
      payLoad: {
        todoTask: null,
      },
    };
    dispatch(action);
  };
}

export function deleteTodoTaskAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { TodoTaskReducer } = getState();
    const { total_records } = TodoTaskReducer;

    dispatch(TodoTaskLoading());
    const db = new useHttp();
    db.delete(`${url}${data.todo_task_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: TODO_TASK_DELETE,
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
       
          dispatch(TodoTaskLoading(false));
          dispatch(TodoTaskSubmit(false));
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

export function getPaginatedTodoTaskListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { TodoTaskReducer } = getState();
    const { page, per_page, filter, sort } = TodoTaskReducer;
    if (TodoTaskReducer.loading === true) return false;
    dispatch(TodoTaskLoading());
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
            type: TODO_TASK_GET_PAGINATED_LIST,
            payLoad: {
              list: data,
              count: data.length,
              total_records: total,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: TODO_TASK_GET_PAGINATED_LIST,
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
        dispatch(TodoTaskLoading(false));
      });
  };
}

export function getSelectedTodoTaskByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { TodoTaskReducer } = getState();

    if (TodoTaskReducer.loading === true) return false;
    dispatch(TodoTaskLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: TODO_TASK_GET,
            payLoad: {
              todoTask: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: TODO_TASK_GET,
            payLoad: {
              todoTask: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(TodoTaskLoading(false));
      });
  };
}

export const updateTodoTaskPaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
    dispatch({
      type: TODO_TASK_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
};

export const updateTodoTaskPaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
    dispatch({
      type: TODO_TASK_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: TODO_TASK_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateTodoTaskIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {

    dispatch({
      type: TODO_TASK_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });

};
