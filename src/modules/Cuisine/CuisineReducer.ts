import {CuisineInitalState} from "./CuisineInitalState";
import {
  CUISINE_LOADING,
  CUISINE_FORM_SUBMIT,
  CUISINE_FORM_HTTP_REQUEST,
  CUISINE_ADD,
  CUISINE_GET_PAGINATED_LIST,
  CUISINE_DELETE,
  CUISINE_PAGNIATION_UPDATE,
  CUISINE_SUCCESS_TOAST,
  CUISINE_GET,
  CUISINE_LAYOUT_STYLE,
  CUISINE_UPDATE,
  CUISINE_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./CuisineTypes";

const CuisineReducer = (state: any = CuisineInitalState.Cuisine, action: any): any => {
  switch (action.type) {
    case CUISINE_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case CUISINE_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case CUISINE_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case CUISINE_LOADING:
      return { ...state, ...action.payLoad };

  case CUISINE_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case CUISINE_ADD:
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
    

    case CUISINE_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case CUISINE_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case CUISINE_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case CUISINE_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case CUISINE_GET:
      return { ...state, ...action.payLoad };

    case CUISINE_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.cuisine_id !== action.payLoad.cuisine_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { CuisineReducer };
