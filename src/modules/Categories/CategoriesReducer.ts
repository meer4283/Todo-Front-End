import {CategoriesInitalState} from "./CategoriesInitalState";
import {
  CATEGORIES_LOADING,
  CATEGORIES_FORM_SUBMIT,
  CATEGORIES_FORM_HTTP_REQUEST,
  CATEGORIES_ADD,
  CATEGORIES_GET_PAGINATED_LIST,
  CATEGORIES_DELETE,
  CATEGORIES_PAGNIATION_UPDATE,
  CATEGORIES_SUCCESS_TOAST,
  CATEGORIES_GET,
  CATEGORIES_LAYOUT_STYLE,
  CATEGORIES_UPDATE,
  CATEGORIES_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./CategoriesTypes";

const CategoriesReducer = (state: any = CategoriesInitalState.Categories, action: any): any => {
  switch (action.type) {
    case CATEGORIES_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case CATEGORIES_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case CATEGORIES_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case CATEGORIES_LOADING:
      return { ...state, ...action.payLoad };

  case CATEGORIES_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case CATEGORIES_ADD:
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
    

    case CATEGORIES_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case CATEGORIES_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case CATEGORIES_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case CATEGORIES_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case CATEGORIES_GET:
      return { ...state, ...action.payLoad };

    case CATEGORIES_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.categories_id !== action.payLoad.categories_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { CategoriesReducer };
