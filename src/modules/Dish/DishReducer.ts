import {DishInitalState} from "./DishInitalState";
import {
  DISH_LOADING,
  DISH_FORM_SUBMIT,
  DISH_FORM_HTTP_REQUEST,
  DISH_ADD,
  DISH_GET_PAGINATED_LIST,
  DISH_DELETE,
  DISH_PAGNIATION_UPDATE,
  DISH_SUCCESS_TOAST,
  DISH_GET,
  DISH_LAYOUT_STYLE,
  DISH_UPDATE,
  DISH_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./DishTypes";

const DishReducer = (state: any = DishInitalState.Dish, action: any): any => {
  switch (action.type) {
    case DISH_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case DISH_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case DISH_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case DISH_LOADING:
      return { ...state, ...action.payLoad };

  case DISH_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case DISH_ADD:
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
    

    case DISH_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case DISH_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case DISH_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case DISH_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case DISH_GET:
      return { ...state, ...action.payLoad };

    case DISH_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.dish_id !== action.payLoad.dish_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { DishReducer };
