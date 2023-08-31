import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiPostCall,
  apiGETCall1,
  apiDeleteCall,
} from "../utilities/site-apis";

var initialState = {
  error: null,
  items: null,
  errorMessage: "",
  question: "",
  history: [],
};

const testUserId = "6422dc94265701f4a2fbacd4";

export const addChatHistoryItem = createAsyncThunk(
  "chat",
  async (params, { values }) => {
    // const UserDetails = localStorage.getItem("userDetails");
    // const UserId = JSON.parse(UserDetails).id;
    const UserId = testUserId;
    const body = {
      userId: UserId,
      question: params,
    };
    const response = await apiPostCall(`/chat`, body);
    if (response.data.status === "error") {
      return values(response.data);
    }
    return response.data;
  }
);

export const getChatHistoryItem = createAsyncThunk(
  "chat/history",
  async (values) => {
    // const UserDetails = localStorage.getItem("userDetails");
    // const UserId = JSON.parse(UserDetails).id;
    const UserId = testUserId;
    const params = {
      userId: UserId,
    };
    const response = await apiGETCall1(`/chat/history`, params);
    if (response.data.status === "error") {
      return values(response.data);
    }
    return response.data.data;
  }
);

export const deleteChatHistory = createAsyncThunk(
  "chat/delete",
  async (values) => {
    // const UserDetails = localStorage.getItem("userDetails");
    // const UserId = JSON.parse(UserDetails).id;
    const UserId = testUserId;
    const params = {
      userId: UserId,
    };
    const response = await apiDeleteCall(`/chat/delete`, params);
    if (response.data.status === "error") {
      return values(response.data);
    }
    return response.data.data;
  }
);

export const counterSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [getChatHistoryItem.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { handleSendQuestion, handleChatHistory } = counterSlice.actions;

export default counterSlice.reducer;
