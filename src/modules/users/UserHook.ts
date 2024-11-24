import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addUserAction,
  updateUserAction,
  getPaginatedUserListAction,
  updateUserPaginationAction,
  updateUserPaginationFilterAction,
  deleteUserAction,
  getSelectedUserByIdAction,
  changeLayoutAction,
  clearUserDataAction,
  updateUserIsInitialTableDataLoadedAction,
  updateUserStateDataUpdate,
  addUserSubscribe
} from "./UserAction";
import { Dispatch } from "redux";

import { default as EndPoints}  from "./usersEndpoints.json"

const useUserHook = (props?: any) => {

  const getPaginatedUserListFromStore = useSelector(
    (state: any) => state.MainUserReducer.list,
    shallowEqual
  );

  const UserSortField = useSelector(
    (state: any) => state.MainUserReducer.sortField,
    shallowEqual
  );
  
  const UserSortOrder = useSelector(
    (state: any) => state.MainUserReducer.sortOrder,
    shallowEqual
  );

  const getUserByIdFromStore = useSelector(
    (state: any) => state.MainUserReducer.user,
    shallowEqual
  );

  const UserList = useSelector(
    (state: any) => state.MainUserReducer.menuList,
    shallowEqual
  );
  const UserLoading = useSelector(
    (state: any) => state.MainUserReducer.loading,
    shallowEqual
  );
  const UserSubmit = useSelector(
    (state: any) => state.MainUserReducer.submitting,
    shallowEqual
  );
  const UserHTTPRequest = useSelector(
    (state: any) => state.MainUserReducer.httpRequest,
    shallowEqual
  );
  const UserFilter = useSelector(
    (state: any) => state.MainUserReducer.filter,
    shallowEqual
  );
  const UserSort = useSelector(
    (state: any) => state.MainUserReducer.sort,
    shallowEqual
  );
  const UserPage = useSelector(
    (state: any) => state.MainUserReducer.page,
    shallowEqual
  );
  const UserPerPage = useSelector(
    (state: any) => state.MainUserReducer.per_page,
    shallowEqual
  );
  const UserTotalRecords = useSelector(
    (state: any) => state.MainUserReducer.total_records,
    shallowEqual
  );

  const UserIsAdded = useSelector(
    (state: any) => state.MainUserReducer?.success,
    shallowEqual
  );

  const UserIsCreated = useSelector(
    (state: any) => state.MainUserReducer.isCreated,
    shallowEqual
  );

  const UserLayoutType = useSelector(
    (state: any) => state.MainUserReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeUserLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const userSubscribe = React.useCallback(
    (formData: object, resetForm: () => void) =>
      dispatch(addUserSubscribe(EndPoints.subscribe, formData, resetForm)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addUserAction(EndPoints.addUser, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (UserId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateUserAction(EndPoints.updateUser, UserId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedUserList = React.useCallback(
    () =>
      dispatch(getPaginatedUserListAction(EndPoints.getPaginatedUserList)),
    [dispatch]
  );

  const getSelectedUserById = React.useCallback(
    (UserId: any) =>
      dispatch(
        getSelectedUserByIdAction(EndPoints.getSelectedUserById, UserId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteUserAction(EndPoints.deleteUser, rowItem)),
    [dispatch]
  );

  const clearUserDataHook = React.useCallback(
    () => dispatch(clearUserDataAction()),
    [dispatch]
  );

  const updateUserPaginated = (sorting: any) =>
    dispatch(updateUserPaginationAction(sorting));

  const updateUserPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateUserPaginationFilterAction(paginationData));

    const updateUserIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateUserIsInitialTableDataLoadedAction(status));

    const updateUserStateDataUpdateHook = (
      paginationData: any
    ) =>
      dispatch(
        updateUserStateDataUpdate(paginationData)
      );

      
  return {
    UserList,
    getPaginatedUserListFromStore,
    UserLoading,
    UserSubmit,
    UserHTTPRequest,
    UserFilter,
    UserSort,
    UserPage,
    UserPerPage,
    UserTotalRecords,
    UserIsAdded,
    UserIsCreated,
    userSubscribe,
    getPaginatedUserList,
    saveForm,
    updateForm,
    updateUserPaginated,
    updateUserPaginationFilterSearch,
    deleteForm,
    getUserByIdFromStore,
    getSelectedUserById,
    changeUserLayoutType,
    UserLayoutType,
    clearUserDataHook,
    updateUserIsInitialTableDataLoaded,
    updateUserStateDataUpdateHook,
    UserSortField,
    UserSortOrder
  };
};
export { useUserHook };
