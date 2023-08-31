import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPostCall } from "../utilities/site-apis";

var initialState = {
  error: null,
  items: null,
  errorMessage: "",
  question: "",
  codehistory: [],
};

export const addCodeHistoryItem = createAsyncThunk(
  "code",
  async (params, { values }) => {
    const UserDetails = localStorage.getItem("userDetails");
    const UserId = JSON.parse(UserDetails).id;
    const body = {
      userId: UserId,
      question: params,
    };
    const response = await apiPostCall(`/code`, body);
    if (response.data.status === "error") {
      return values(response.data);
    }
    return response.data;
  }
);

export const getCodeHistoryItem = createAsyncThunk(
  "code/history",
  async (values) => {
    const UserDetails = localStorage.getItem("userDetails");
    const UserId = JSON.parse(UserDetails).id;
    const body = {
      userId: UserId,
    };
    const response = await apiPostCall(`/code/history`, body);
    if (response.data.status === "error") {
      return values(response.data);
    }
    return response.data.data;
  }
);

export const counterSlice = createSlice({
  name: "code",
  initialState,
  reducers: {},
  extraReducers: {
    [getCodeHistoryItem.fulfilled]: (state, action) => {
      state.codehistory = action.payload;
    },
  },
});

export const { handleSendQuestion, handleCodeHistory } = counterSlice.actions;

export default counterSlice.reducer;
