import {
  CATEGORIES_LOADING,
  CATEGORIES_FORM_SUBMIT,
  CATEGORIES_ADD,
  CATEGORIES_DELETE,
  CATEGORIES_PAGNIATION_UPDATE,
  CATEGORIES_GET_PAGINATED_LIST,
  CATEGORIES_GET,
  CATEGORIES_LAYOUT_STYLE,
  CATEGORIES_UPDATE,
  CATEGORIES_FORM_HTTP_REQUEST,
  CATEGORIES_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./CategoriesTypes";
import { batch } from "react-redux";
import { findIndex } from "lodash";
import { useHttp } from "@/hooks";
import { GLOBAL_TOAST } from "@/store/types";
import { BASE_URL } from "@/utils/constants";
import { getCookieData } from "@/utils";

const CategoriesLoading = (status = true) => {
  const payLoad = status
    ? { loading: true, error: false, success: null }
    : { loading: false };
  const action: any = {
    type: CATEGORIES_LOADING,
    payLoad,
  };
  return action;
};

const CategoriesSubmit = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: CATEGORIES_FORM_SUBMIT,
    payLoad,
  };
  return action;
};

const CategoriesHttpRequest = (status = true) => {
  const payLoad = status ? { submitting: true } : { submitting: false };
  const action: any = {
    type: CATEGORIES_FORM_HTTP_REQUEST,
    payLoad,
  };
  return action;
};
export function addCategoriesAction(url: string, formData: any, resetForm: () => void, isSaveAndExit: boolean, showSideBar: (status: boolean) => void) {
  return (dispatch: DispatchType, getState: any) => {
    // Show loading state
    dispatch(CategoriesLoading(true));
    dispatch(CategoriesSubmit(true));

    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        // No need for 'Content-Type' for FormData, it is set automatically by fetch
        'refresh-token': getCookieData({ localKey: 'refreshToken' }),
        'Authorization': `Bearer ${getCookieData({ localKey: 'accessToken' })}`
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();  // Parse the JSON response
        } else {
          // If response is not OK, return a rejected promise with error details
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Something went wrong!');
          });
        }
      })
      .then(data => {
        const { record } = data;

        // Reset the form
        resetForm();

        const action: any = {
          type: CATEGORIES_ADD,
          payLoad: record,
        };

        batch(() => {
          dispatch(action);

          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: true,
              toastMessage: data.message,
              toastDetail: null,
              toastType: 'success',
            },
          });
        });

        // Optionally close the sidebar if isSaveAndExit is true
        if (isSaveAndExit) {
          showSideBar(false);
        }
      })
      .catch(error => {
        // Handle any errors, including non-OK responses
        dispatch({
          type: GLOBAL_TOAST,
          payLoad: {
            showToast: true,
            toastMessage: error.message || 'Network error!',
            toastDetail: null,
            toastType: 'error',
          },
        });
      })
      .finally(() => {
        // Reset the loading state in the finally block
        dispatch(CategoriesLoading(false));
        dispatch(CategoriesSubmit(false));

        batch(() => {
          dispatch({
            type: GLOBAL_TOAST,
            payLoad: {
              showToast: false,
              toastMessage: null,
              toastDetail: null,
              toastType: 'success',
            },
          });
        });
      });
    //   const { CategoriesReducer } = getState();
    //   const { total_records } = CategoriesReducer;

    //   dispatch(CategoriesSubmit());
    //   const db = new useHttp();
    //   const response = await fetch(`${BASE_URL}/cloud-lead/custom-lead-requests`, {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //         'Accept': 'application/json',
    //         // Remove 'Content-Type': 'application/json', as it's not needed for FormData
    //         'refresh-token': getCookieData({ localKey: "refreshToken" }),
    //         'Authorization': `Bearer ${getCookieData({ localKey: "accessToken" })}`
    //     },
    // });
    //   // db.post(url, formData)
    //   //   .then((res: any) => {
    //   //     const { record } = res.data;

    //   //     if (res.status === 200) {

    //   //       resetForm();
    //   //       const action: any = {
    //   //         type: CATEGORIES_ADD,
    //   //         payLoad: record,
    //   //         total_records: total_records + 1,
    //   //       };
    //   //       batch(() => {
    //   //         dispatch(action);

    //   //         dispatch({
    //   //           type: GLOBAL_TOAST,
    //   //           payLoad: {
    //   //             showToast: true,
    //   //             toastMessage: res.data.message,
    //   //             toastDetail: null,
    //   //             toastType: "success",
    //   //           },
    //   //         });
    //   //       });
    //   //       if(isSaveAndExit){
    //   //         showSideBar(false)
    //   //       }
    //   //     }
    //   //   })
    //   //   .finally(() => {
    //   //     dispatch(CategoriesLoading(false));
    //   //     dispatch(CategoriesSubmit(false));
    //   //     batch(() => {
    //   //       dispatch({
    //   //         type: GLOBAL_TOAST,
    //   //         payLoad: {
    //   //           showToast: false,
    //   //           toastMessage: null,
    //   //           toastDetail: null,
    //   //           toastType: "success",
    //   //         },
    //   //       });
    //   //     });
    //   //   });
  };
}

export function updateCategoriesAction(
  url: string,
  modelId: number,
  formData: object,
  resetForm: () => void,
  isSaveAndExit: boolean,
  showSideBar: (status: boolean) => void
) {
  return (dispatch: DispatchType, getState: any) => {
    const { CategoriesReducer } = getState();
    const { list } = CategoriesReducer;
    const listIndex = findIndex(list, function (listItem: any) {
      return listItem.categories_id === modelId;
    });
    dispatch(CategoriesSubmit());
    const db = new useHttp();
    db.put(`${url}${modelId}`, formData)
      .then((res: any) => {
        const { record } = res.data;

        if (res.status === 200) {
          resetForm();
          const action: any = {
            type: CATEGORIES_UPDATE,
            payLoad: { record, listIndex },
          };
          const updateAction: any = {
            type: CATEGORIES_GET,
            payLoad: {
              categories: record,
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
            showSideBar(false)
          }

        }
      })
      .finally(() => {
        batch(() => {
          dispatch(CategoriesLoading(false));
          dispatch(CategoriesSubmit(false));
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

export function clearCategoriesDataAction() {
  return (dispatch: DispatchType, getState: any) => {
    const action: any = {
      type: CATEGORIES_GET,
      payLoad: {
        categories: null,
      },
    };
    dispatch(action);
  };
}

export function deleteCategoriesAction(url: string, data: any) {
  return (dispatch: DispatchType, getState: any) => {
    const { CategoriesReducer } = getState();
    const { total_records } = CategoriesReducer;

    dispatch(CategoriesLoading());
    const db = new useHttp();
    db.delete(`${url}${data.category_id}`)
      .then((res: any) => {
        if (res.status === 200) {
          const action: any = {
            type: CATEGORIES_DELETE,
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
          dispatch(CategoriesLoading(false));
          dispatch(CategoriesSubmit(false));
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

export function getPaginatedCategoriesListAction(URL: string) {
  return (dispatch: DispatchType, getState: any) => {
    const { CategoriesReducer } = getState();
    const { page, per_page, filter, sort } = CategoriesReducer;
    if (CategoriesReducer.loading === true) return false;
    dispatch(CategoriesLoading());
    const db = new useHttp();

    db.get(
      URL + `?page=${page}&per_page=${per_page}&filter=${filter}&sort=${sort}`
    )
      .then((result: any) => {
        const {list , pagination} = result.data;
        if (list?.length > 0) {

          const { currentPage, per_page,totalPages,totalRecords } = pagination;
          const action: any = {
            type: CATEGORIES_GET_PAGINATED_LIST,
            payLoad: {
              list: list,
              count: list.length,
              total_records: totalRecords,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: CATEGORIES_GET_PAGINATED_LIST,
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
        dispatch(CategoriesLoading(false));
      });
  };
}

export function getSelectedCategoriesByIdAction(URL: string, modelId: number) {
  return (dispatch: DispatchType, getState: any) => {
    const { CategoriesReducer } = getState();

    if (CategoriesReducer.loading === true) return false;
    dispatch(CategoriesLoading());
    const db = new useHttp();

    db.get(URL + modelId)
      .then((result: any) => {
        if (result) {
          const action: any = {
            type: CATEGORIES_GET,
            payLoad: {
              categories: result?.data,
            },
          };
          dispatch(action);
        } else {
          const action: any = {
            type: CATEGORIES_GET,
            payLoad: {
              categories: "",
            },
          };
          dispatch(action);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(CategoriesLoading(false));
      });
  };
}

export const updateCategoriesPaginationAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { page, per_page } = paginationData;
  batch(() => {
    dispatch({
      type: CATEGORIES_PAGNIATION_UPDATE,
      payLoad: { page: page, per_page: per_page },
    });
  });
};

export const updateCategoriesPaginationFilterAction = (paginationData: any) => (
  dispatch: DispatchType
) => {
  const { filter, page, per_page, sort } = paginationData;
  batch(() => {
    dispatch({
      type: CATEGORIES_PAGNIATION_UPDATE,
      payLoad: { filter: filter, page: page, per_page: per_page, sort: sort },
    });
  });
};

export function changeLayoutAction(layoutStyle: any) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: CATEGORIES_LAYOUT_STYLE,
      payLoad: { layoutStyle },
    });
  };
}

export const updateCategoriesIsInitialTableDataLoadedAction = (status: boolean) => (
  dispatch: DispatchType
) => {

  batch(() => {
    dispatch({
      type: CATEGORIES_IS_INITIAL_TABLE_DATA_LOADED_UPDATE,
      payLoad: { isInitialTableDataLoaded: status },
    });
  });
};
