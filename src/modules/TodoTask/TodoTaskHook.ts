import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addTodoTaskAction,
  updateTodoTaskAction,
  getPaginatedTodoTaskListAction,
  updateTodoTaskPaginationAction,
  updateTodoTaskPaginationFilterAction,
  deleteTodoTaskAction,
  getSelectedTodoTaskByIdAction,
  changeLayoutAction,
  clearTodoTaskDataAction,
  updateTodoTaskIsInitialTableDataLoadedAction
} from "./TodoTaskAction";
import { Dispatch } from "redux";
import { default as EndPoints } from "./TodoTaskEndPoints.json";

const useTodoTaskHook = (props?: any) => {
  const getPaginatedTodoTaskListFromStore = useSelector(
    (state: any) => state.TodoTaskReducer.list,
    shallowEqual
  );

  const getTodoTaskByIdFromStore = useSelector(
    (state: any) => state.TodoTaskReducer.todoTask,
    shallowEqual
  );

  const TodoTaskList = useSelector(
    (state: any) => state.TodoTaskReducer.menuList,
    shallowEqual
  );
  const TodoTaskLoading = useSelector(
    (state: any) => state.TodoTaskReducer.loading,
    shallowEqual
  );
  const TodoTaskSubmit = useSelector(
    (state: any) => state.TodoTaskReducer.submitting,
    shallowEqual
  );
  const TodoTaskHTTPRequest = useSelector(
    (state: any) => state.TodoTaskReducer.httpRequest,
    shallowEqual
  );
  const TodoTaskFilter = useSelector(
    (state: any) => state.TodoTaskReducer.filter,
    shallowEqual
  );
  const TodoTaskSort = useSelector(
    (state: any) => state.TodoTaskReducer.sort,
    shallowEqual
  );
  const TodoTaskPage = useSelector(
    (state: any) => state.TodoTaskReducer.page,
    shallowEqual
  );
  const TodoTaskPerPage = useSelector(
    (state: any) => state.TodoTaskReducer.per_page,
    shallowEqual
  );
  const TodoTaskTotalRecords = useSelector(
    (state: any) => state.TodoTaskReducer.total_records,
    shallowEqual
  );

  const TodoTaskIsAdded = useSelector(
    (state: any) => state.TodoTaskReducer?.success,
    shallowEqual
  );

  const TodoTaskIsCreated = useSelector(
    (state: any) => state.TodoTaskReducer.isCreated,
    shallowEqual
  );

  const TodoTaskLayoutType = useSelector(
    (state: any) => state.TodoTaskReducer.layoutStyle,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const changeTodoTaskLayoutType = React.useCallback(
    (layoutStyle: any) => dispatch(changeLayoutAction(layoutStyle)),
    [dispatch]
  );

  const saveForm = React.useCallback(
    (formData: object, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(addTodoTaskAction(EndPoints.addTodoTask, formData, resetForm,isSaveExit,showSideBar)),
    [dispatch]
  );
  const updateForm = React.useCallback(
    (TodoTaskId: any, data: any, resetForm: () => void, isSaveExit:boolean,showSideBar:(status:boolean)=>void) =>
      dispatch(
        updateTodoTaskAction(EndPoints.updateTodoTask, TodoTaskId, data, resetForm, isSaveExit,showSideBar)
      ),
    [dispatch]
  );
  const getPaginatedTodoTaskList = React.useCallback(
    () =>
      dispatch(getPaginatedTodoTaskListAction(EndPoints.getPaginatedTodoTaskList)),
    [dispatch]
  );

  const getSelectedTodoTaskById = React.useCallback(
    (TodoTaskId: any) =>
      dispatch(
        getSelectedTodoTaskByIdAction(EndPoints.getSelectedTodoTaskById, TodoTaskId)
      ),
    [dispatch]
  );

  const deleteForm = React.useCallback(
    (rowItem: any) =>
      dispatch(deleteTodoTaskAction(EndPoints.deleteTodoTask, rowItem)),
    [dispatch]
  );

  const clearTodoTaskDataHook = React.useCallback(
    () => dispatch(clearTodoTaskDataAction()),
    [dispatch]
  );

  const updateTodoTaskPaginated = (sorting: any) =>
    dispatch(updateTodoTaskPaginationAction(sorting));

  const updateTodoTaskPaginationFilterSearch = (paginationData: any) =>
    dispatch(updateTodoTaskPaginationFilterAction(paginationData));

    const updateTodoTaskIsInitialTableDataLoaded = (status: boolean) =>
    dispatch(updateTodoTaskIsInitialTableDataLoadedAction(status));

  return {
    TodoTaskList,
    getPaginatedTodoTaskListFromStore,
    TodoTaskLoading,
    TodoTaskSubmit,
    TodoTaskHTTPRequest,
    TodoTaskFilter,
    TodoTaskSort,
    TodoTaskPage,
    TodoTaskPerPage,
    TodoTaskTotalRecords,
    TodoTaskIsAdded,
    TodoTaskIsCreated,
    getPaginatedTodoTaskList,
    saveForm,
    updateForm,
    updateTodoTaskPaginated,
    updateTodoTaskPaginationFilterSearch,
    deleteForm,
    getTodoTaskByIdFromStore,
    getSelectedTodoTaskById,
    changeTodoTaskLayoutType,
    TodoTaskLayoutType,
    clearTodoTaskDataHook,
    updateTodoTaskIsInitialTableDataLoaded,
  };
};
export { useTodoTaskHook };
