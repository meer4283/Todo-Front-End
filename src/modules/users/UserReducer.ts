import initialState from "../../store/initialState/initialState";
import {
  USER_LOADING,
  USER_FORM_SUBMIT,
  USER_FORM_HTTP_REQUEST,
  USER_ADD,
  USER_GET_PAGINATED_LIST,
  USER_DELETE,
  USER_PAGNIATION_UPDATE,
  USER_SUCCESS_TOAST,
  USER_GET,
  USER_LAYOUT_STYLE,
  USER_UPDATE,
  USER_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./UserTypes";

const MainUserReducer = (state: any = initialState.User, action: any): any => {
  switch (action.type) {
    case USER_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case USER_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case USER_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case USER_LOADING:
      return { ...state, ...action.payLoad };

  case USER_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case USER_ADD:
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
    

    case USER_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case USER_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case USER_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case USER_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case USER_GET:
      return { ...state, ...action.payLoad };

    case USER_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.USER_id !== action.payLoad.USER_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { MainUserReducer };
