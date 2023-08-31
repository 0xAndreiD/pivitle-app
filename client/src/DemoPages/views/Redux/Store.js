import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import AuthRedux from "./AuthRedux";
import MenuRedux from "./MenuRedux";
import ChatHistoryRedux from "./ChatHistoryRedux";
import CodeHistoryRedux from "./CodeHistoryRedux";

const reducers = combineReducers({
  auth: AuthRedux,
  menu: MenuRedux,
  chat: ChatHistoryRedux,
  code: CodeHistoryRedux,
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
});
