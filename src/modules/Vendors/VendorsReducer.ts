import {VendorsInitalState} from "./VendorsInitalState";
import {
  VENDORS_LOADING,
  VENDORS_FORM_SUBMIT,
  VENDORS_FORM_HTTP_REQUEST,
  VENDORS_ADD,
  VENDORS_GET_PAGINATED_LIST,
  VENDORS_DELETE,
  VENDORS_PAGNIATION_UPDATE,
  VENDORS_SUCCESS_TOAST,
  VENDORS_GET,
  VENDORS_LAYOUT_STYLE,
  VENDORS_UPDATE,
  VENDORS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE
} from "./VendorsTypes";

const VendorsReducer = (state: any = VendorsInitalState.Vendors, action: any): any => {
  switch (action.type) {
    case VENDORS_SUCCESS_TOAST:
      return { ...state, ...action.payLoad };

    case VENDORS_FORM_SUBMIT:
      return { ...state, ...action.payLoad };

    case VENDORS_FORM_HTTP_REQUEST:
      return { ...state, ...action.payLoad };

    case VENDORS_LOADING:
      return { ...state, ...action.payLoad };

  case VENDORS_IS_INITIAL_TABLE_DATA_LOADED_UPDATE:
        return { ...state, ...action.payLoad };
      
    case VENDORS_ADD:
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
    

    case VENDORS_GET_PAGINATED_LIST:
      return { ...state, ...action.payLoad };

    case VENDORS_PAGNIATION_UPDATE:
      return { ...state, ...action.payLoad };

    case VENDORS_LAYOUT_STYLE:
      return { ...state, ...action.payLoad };

    case VENDORS_UPDATE:
      {
        { const { record, listIndex } = action.payLoad;
        const itemData: any = state.list[listIndex];
        state.list[listIndex] = { ...itemData, ...record };
        return state; }
      }
      

    case VENDORS_GET:
      return { ...state, ...action.payLoad };

    case VENDORS_DELETE:
      {
        const Data = state.list.filter(
          (listItem: any) =>
            listItem.vendors_id !== action.payLoad.vendors_id
        );
        return { ...state, list: [...Data], total_records: action.total_records };
      }
     
  }

  return state;
};

export { VendorsReducer };
