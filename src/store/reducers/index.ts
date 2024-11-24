import { combineReducers } from 'redux';
import userReducer from './userReducer';

import {
    GlobalReducer,
    Login,
    GeneralConfigurationReducer,
    MainUserReducer,
    AdminUserReducer,
    CategoriesReducer,
    CuisineReducer,
    OrdersReducer,
    VendorsReducer,
    DishReducer
  } from "@/store/reducers/reducers";


export const createReducer = combineReducers({
    userReducer: userReducer,
    GlobalReducer,
    login: Login,
    GeneralConfigurationReducer,
    MainUserReducer,
    AdminUserReducer,
    CategoriesReducer,
    CuisineReducer,
    OrdersReducer,
    VendorsReducer,
    DishReducer
})

  