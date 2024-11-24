import {TodoTaskInitalState} from "./TodoTaskInitalState";
import {
  TODO_TASK_LOADING,
  TODO_TASK_FORM_SUBMIT,
  TODO_TASK_FORM_HTTP_REQUEST,
  TODO_TASK_ADD,
  TODO_TASK_GET_PAGINATED_LIST,
  TODO_TASK_DELETE,
  TODO_TASK_PAGNIATION_UPDATE,
  TODO_TASK_SUCCESS_TOAST,
  TODO_TASK_GET,
  TODO_TASK_LAYOUT_STYLE,
  TODO_TASK_UPDATE,
  TODO_TASK_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./TodoTaskTypes";

const TodoTaskReducer = (state: any = TodoTaskInitalState.TodoTask, action: any): any => {
  switch (action.type) {
    case TODO_TASK_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case TODO_TASK_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case TODO_TASK_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case TODO_TASK_LOADING:
      return { ...state, ...action.payLoad };

  case TODO_TASK_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case TODO_TASK_ADD:
      {
        const tableList = state?.list;

        if (state.per_page === parseInt(tableList?.length)) {
          const startIndex = tableList?.length - 1; // Calculate the starting index
          tableList?.splice(startIndex, 1); // Get a new array with the removed elements
        }
  
        return {
          ...state,
          list: [...[action.payLoad], ...tableList],
          total_records: action.total_records,
        };
      }
    

    case TODO_TASK_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case TODO_TASK_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case TODO_TASK_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case TODO_TASK_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case TODO_TASK_GET:
      return { ...state, ...action.payLoad };

    case TODO_TASK_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.todo_task_id !== action.payLoad.todo_task_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { TodoTaskReducer };
