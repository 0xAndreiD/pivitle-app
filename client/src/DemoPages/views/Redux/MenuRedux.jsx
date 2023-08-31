import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiPostCall1,
  apiGETCall1,
  apiPutCall,
  apiDeleteCall,
} from "../utilities/site-apis";

var initialState = {
  isFetching: false,
  error: null,
  items: null,
  errorMessage: "",
  selected: {},
  selectedSubMenu: {},
  content: "",
  selectedItems: [],
  editMode: false,
};

export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall1(`/menu`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async (params, { rejectWithValue }) => {
    const response = await apiPutCall(`/menu/${params._id}`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (params = {}, { rejectWithValue }) => {
    const response = await apiDeleteCall(`/menu/${params._id}`);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const getMenuList = createAsyncThunk(
  "menu/getMenuList",
  async (params = {}, { rejectWithValue }) => {
    const response = await apiGETCall1(`/menu`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const resetRedux = createAsyncThunk(
  "subMenu/resetRedux",
  async (params, { rejectWithValue }) => {
    return 0;
  }
);

export const counterSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    handleMenuSelect: (state, action) => {
      state.selected = action.payload;
      state.selectedSubMenu = {};
      state.content = action.payload?.content;
    },
    handleSubMenuSelect: (state, action) => {
      state.selectedSubMenu = action.payload;
      state.content = action.payload?.content;
    },
    handleChangeContent: (state, action) => {
      state.content = action.payload;
    },
    handleSelectedItem: (state, action) => {
      state.selectedItems = action.payload;
    },
  },
  extraReducers: {
    [addMenuItem.pending]: (state, action) => {
      state.isFetching = true;
      state.error = null;
    },
    [addMenuItem.rejected]: (state, action) => {
      state.errorMessage = action.payload.error;
      state.isFetching = false;
    },
    [addMenuItem.fulfilled]: (state, action) => {
      let result = action.payload.message.substr(4, 4);
      state.isFetching = false;
      state.error = null;
      state.errorMessage = "null";
      state.items.push(action.payload.data);
    },
    [updateMenuItem.pending]: (state, action) => {
      state.isFetching = true;
      state.error = null;
    },
    [updateMenuItem.rejected]: (state, action) => {
      state.errorMessage = action.payload.error;
      state.isFetching = false;
    },
    [updateMenuItem.fulfilled]: (state, action) => {
      let result = action.payload?.message;
      state.isFetching = false;
      state.error = null;
      state.errorMessage = "null";
      state.items = state.items.map((item) =>
        item._id == action.payload.data._id ? action.payload.data : item
      );
      var newSelected = [action.payload.data];
      for (let i = 1; i < state.selectedItems.length; i++) {
        newSelected.push({
          ...newSelected[i - 1]?.subMenus[state.selectedItems[i]?.index],
          index: state.selectedItems[i]?.index,
        });
      }
      state.selectedItems = newSelected;
    },
    [deleteMenuItem.pending]: (state, action) => {
      state.isFetching = true;
      state.error = null;
    },
    [deleteMenuItem.rejected]: (state, action) => {
      state.errorMessage = action.payload.error;
      state.isFetching = false;
    },
    [deleteMenuItem.fulfilled]: (state, action) => {
      let result = action.payload.message.substr(4, 4);
      state.isFetching = false;
      state.error = null;
      state.errorMessage = "null";
      state.items = state.items.filter(
        (item) => item._id !== action.payload.data._id
      );
    },
    [getMenuList.pending]: (state, action) => {
      state.isFetching = true;
      state.error = null;
    },
    [getMenuList.rejected]: (state, action) => {
      state.errorMessage = action.payload?.error;
      state.isFetching = false;
    },
    [getMenuList.fulfilled]: (state, action) => {
      let result = action.payload.message.substr(4, 4);
      state.isFetching = false;
      state.error = null;
      state.errorMessage = "null";
      state.items = action.payload.data;
    },
    [resetRedux.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.items = [];
      state.selected = {};
      state.errorMessage = "";
    },
  },
});

export const {
  handleMenuSelect,
  handleSubMenuSelect,
  handleChangeContent,
  handleSelectedItem,
} = counterSlice.actions;

export default counterSlice.reducer;
