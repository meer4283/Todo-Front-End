import {
  USER_LOADING,
  USER_FORM_SUBMIT,
  USER_ADD,
  USER_DELETE,
  USER_PAGNIATION_UPDATE,
  USER_GET_PAGINATED_LIST,
  USER_GET,
  USER_LAYOUT_STYLE,
  USER_UPDATE,
  USER_FORM_HTTP_REQUEST,
  USER_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
} from "./UserTypes";

import { batch } from "react-redux";
import { findIndex } from "lodash"; 
import { useHttp } from "@/hooks/useHttp";
import { GLOBAL_TOAST } from "@/store/types";


const UserLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: USER_LOADING,
    payLoad,
  };
  return action;
};

const UserSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: USER_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const UserHttpRequest = (status = true) => {
  const payLoad = status ? { httpRequest: true } : { httpRequest: false };
  const action: any = {
    type: USER_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addUserAction(
  url: string,
  formData: object,
  resetForm: () => void,
  isSaveAndExit: boolean,
  showSideBar: (status: boolean) => void
) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    const { total_records } = MainUserReducer;

    dispatch(UserSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const record = res.data.user;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: USER_ADD,
            payLoad: record,
            total_records: total_records + 1,
          };
          batch(() => {
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
          });
          if (isSaveAndExit) {
            showSideBar(false);
          }
        }
      })
      .finally(() => {
        dispatch(UserSubmit(false));
        batch(() => {
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
      });
  };
}

export function addUserSubscribe(
  url: string,
  formData: object,
  resetForm: () => void
) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    const { total_records } = MainUserReducer;

    dispatch(UserSubmit());
    const db = new useHttp();
    db.post(url, formData)
      .then((res: any) => {
        const record = res.data.user;

        if (res.status === 200) {
          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: true,
              toastMessage: res.data.message,
              toastDetail: null,
              toastType: "success",
            },
          });
        }
      })
      .finally(() => {
        dispatch(UserSubmit(false));
        batch(() => {
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
      });
  };
}

export function updateUserAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit: boolean,
  showSideBar: (status: boolean) => void
) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    const { list } = MainUserReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.id === modelId;
    });
    dispatch(UserSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const record = res.data.user;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: USER_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: USER_GET,
            payLoad: {
              user: record,
            },
          };
          batch(() => {
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
          });
          if (isSaveAndExit) {
            showSideBar(false);
          }
        }
      })
      .finally(() => {
        batch(() => {
          dispatch(UserSubmit(false));
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
      });
  };
}

export function clearUserDataAction() {
  return (dispatch: any, getState: any) => {
    const action: any = {
      type: USER_GET,
      payLoad: {
        user: null,
      },
    };
    dispatch(action);
  };
}

export function deleteUserAction(url: string, data: any) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    const { total_records } = MainUserReducer;

    dispatch(UserLoading());
    const db = new useHttp();
    db.delete(`${url}${data.id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: USER_DELETE,
            payLoad: data,
            total_records: total_records - 1,
          };
          batch(() => {
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
          });
        }
      })
      .finally(() => {
        batch(() => {
          dispatch(UserLoading(false));
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
      });
  };
}

export function getPaginatedUserListAction(URL: string) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    const { page, per_page, filter, sort } = MainUserReducer;
    if (MainUserReducer.loading === true) return false;
    dispatch(UserLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const {list , pagination} = result.data;
        if (list?.length > 0) {

          const { currentPage, per_page,totalPages,totalRecords } = pagination;
          const action: any = {
            type: USER_GET_PAGINATED_LIST,
            payLoad: {
              list: list,
              count: list.length,
              total_records: totalRecords,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: USER_GET_PAGINATED_LIST,
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
        dispatch(UserLoading(false));
      });
  };
}

export function getSelectedUserByIdAction(URL: string, modelId: number) {
  return (dispatch: any, getState: any) => {
    const { MainUserReducer } = getState();
    if (MainUserReducer.httpRequest === true) return false;
    dispatch(UserHttpRequest());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: USER_GET,
            payLoad: {
              user: result?.data?.user,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: USER_GET,
            payLoad: {
              user: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(UserHttpRequest(false));
      });
  };
}

export const updateUserPaginationAction =
  (paginationData: any) => (dispatch: any) => {
    const { page, per_page } = paginationData;
    batch(() => {
      dispatch({
        type: USER_PAGNIATION_UPDATE,
        payLoad: { page: page, per_page: per_page },
      });
    });
  };

export const updateUserPaginationFilterAction =
  (paginationData: any) => (dispatch: any) => {
    const { filter, page, per_page, sort } = paginationData;
    batch(() => {
      dispatch({
        type: USER_PAGNIATION_UPDATE,
        payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
      });
    });
  };

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: any) => {
    dispatch({
      type: USER_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateUserIsInitialTableDataLoadedAction =
  (status: boolean) => (dispatch: any) => {
    batch(() => {
      dispatch({
        type: USER_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
        payLoad: { isInitialTableDataLoaded: status },
      });
    });
  };

export const updateUserStateDataUpdate = (data: any) => (dispatch: any) => {
  batch(() => {
    dispatch({
      type: USER_PAGNIATION_UPDATE,
      payLoad: data,
    });
  });
};
