export const TodoTaskInitalState = {
  TodoTask: {
    loading: false,
    submitting: false,
    httpRequest: false,
    list: null,
    isInitialTableDataLoaded:false,
    todoTask: null,
    filter: "",
    sort: "todo_task.created_at|desc",
    total_records: 0,
    page: 1,
    per_page: 10,
    isCreated: false,
    inputError: null,
    layoutStyle:'table'
  },
};
