import {OrdersInitalState} from "./OrdersInitalState";
import {
  ORDERS_LOADING,
  ORDERS_FORM_SUBMIT,
  ORDERS_FORM_HTTP_REQUEST,
  ORDERS_ADD,
  ORDERS_GET_PAGINATED_LIST,
  ORDERS_DELETE,
  ORDERS_PAGNIATION_UPDATE,
  ORDERS_SUCCESS_TOAST,
  ORDERS_GET,
  ORDERS_LAYOUT_STYLE,
  ORDERS_UPDATE,
  ORDERS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./OrdersTypes";

const OrdersReducer = (state: any = OrdersInitalState.Orders, action: any): any => {
  switch (action.type) {
    case ORDERS_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case ORDERS_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case ORDERS_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case ORDERS_LOADING:
      return { ...state, ...action.payLoad };

  case ORDERS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case ORDERS_ADD:
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
    

    case ORDERS_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case ORDERS_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case ORDERS_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case ORDERS_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case ORDERS_GET:
      return { ...state, ...action.payLoad };

    case ORDERS_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.orders_id !== action.payLoad.orders_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { OrdersReducer };
