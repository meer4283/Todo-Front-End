import { combineReducers } from 'redux';

import {
    GlobalReducer,
    TodoTaskReducer,
  } from "@/store/reducers/reducers";


export const createReducer = combineReducers({
    GlobalReducer,
    TodoTaskReducer
})

  