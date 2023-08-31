import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetCall,
  apiPostCall,
  apiPostCall1,
  apiGETCall1,
  apiPutCall,
} from "../utilities/site-apis";

const initialState = {
  isFetching: false,
  error: null,
  isOptSend: false,
  name: null,
  phone: null,
  user: null,
  token: null,
  isSignUp: false,
  email: "",
  otp: null,
  errorMessage: "",
  isVerified: false,
  userDetails: {},
  passwordChanged: false,
  Authorization: false,
  usersList: [],
  roles: [],
  nonPos: {},
  emailSent: null,
  subscriptions: null,
  cart: {
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  cartItems: [],
  addedToCart: null,
  paymentRedirect: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall(`/user/register`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall(`/auth/login`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const findUser = createAsyncThunk(
  "auth/findUser",
  async (params, { rejectWithValue }) => {
    return params;
  }
);

export const updateUserRoles = createAsyncThunk(
  "user/roles",
  async (params, { rejectWithValue }) => {
    const response = await apiPutCall(`/user/role`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const updateAuthorization = createAsyncThunk(
  "auth/Authorization",
  async (params, { rejectWithValue }) => {
    return params;
  }
);

export const resetRedux = createAsyncThunk(
  "auth/resetRedux",
  async (params, { rejectWithValue }) => {
    return 0;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (params, { rejectWithValue }) => {
    const response = await apiPutCall(`user/` + params.userId, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const resendOTP = createAsyncThunk(
  "auth/otpReSend",
  async (params, { rejectWithValue }) => {
    const response = await apiGetCall(`/user/resendCode`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (params, { rejectWithValue }) => {
    const response = await apiGetCall(`/user/forgotPassword`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall(`/user/changePassword`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const sendEmail = createAsyncThunk(
  "auth/sendEmail",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall1(`/static/sendUserEmail`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const GetUserList = createAsyncThunk(
  "auth/GetUserList",
  async (params, { rejectWithValue }) => {
    const response = await apiGETCall1(`/user/list`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const getClientSecret = createAsyncThunk(
  "auth/GetClientSecret",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall1(`/user/subscription`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const GetSubscriptions = createAsyncThunk(
  "auth/subscriptions",
  async (params = {}, { rejectWithValue }) => {
    const response = await apiGETCall1(`/static/subscriptions`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (params, { rejectWithValue }) => {
    return params;
  }
);

export const verifyUser1 = createAsyncThunk(
  "auth/verifyUser1",
  async (params, { rejectWithValue }) => {
    localStorage.setItem("Authorization", params?.data?.Authorization);
    localStorage.setItem("userDetails", JSON.stringify(params?.data));
    return params;
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall(`/user/verifyUser`, params);
    if (response.data.status === "error") {
      return rejectWithValue(response.data);
    }
    localStorage.setItem("Authorization", response?.data?.data?.Authorization);
    localStorage.setItem("userDetails", JSON.stringify(response?.data?.data));
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginRedirectUrl: (state, action) => {
      state.loginRedirectUrl = action.payload;
    },
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    addToCart: (state, action) => {
      var exists = false;
      state.cartItems = [...state.cartItems, action.payload];
      state.cart = {
        subTotal: state.cart.subTotal + action.payload.price,
        // tax: state.cart.tax + ((action.payload.price * 18)/ 100)
        tax: 0,
      };
      state.cart = {
        ...state.cart,
        total: state.cart.tax + state.cart.subTotal,
      };
      state.addedToCart =
        action.payload.label + " has been added to your cart.";
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.title !== action.payload.title
      );
      state.cart = {
        subTotal: state.cart.subTotal - action.payload.price,
        tax: state.cart.tax - (action.payload.price * 18) / 100,
      };
      state.cart = {
        ...state.cart,
        total: state.cart.tax + state.cart.subTotal,
      };
      state.addedToCart =
        action.payload.label + " has been removed from your cart.";
    },
  },

  extraReducers: {
    [register.pending]: (state, action) => {
      state.isFetching = true;
      state.error = null;
      state.isOptSend = false;
    },
    [register.rejected]: (state, action) => {
      if (
        action.payload.message ==
        "OTP already sent, please check else resend the otp"
      ) {
        state.isOptSend = true;
        state.isFetching = false;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      } else if (action.payload.message == "User Not Exist !! Please Signup") {
        state.isSignUp = true;
        state.isFetching = false;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      } else if (
        action.payload.message == "User already exist. Please signin"
      ) {
        state.isSignUp = false;
        state.isFetching = false;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      } else {
        state.isFetching = false;
        state.error = action.payload.message;
      }
    },
    [register.fulfilled]: (state, action) => {
      if (
        action.payload.message ==
        "Email already registered. Take an another email"
      ) {
        state.error = true;
        state.errorMessage = action.payload.message;
        state.isFetching = false;
      } else if (action.payload.message == "OTP already sent, Please Verify!") {
        alert(action.payload.message);
        state.isFetching = false;
        state.error = null;
        state.isOptSend = true;
      } else if (action.payload.message == "Success") {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.email = action.payload.email;
        state.isOptSend = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.message == "Unauthorized") {
        state.error = true;
        state.errorMessage =
          "Invalid Credentials! Please check username & password.";
        state.isFetching = false;
      } else if (action.payload.message == "Success") {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(action.payload.data.data)
        );
        localStorage.setItem(
          "Authorization",
          action.payload.data.Authorization
        );
        state.isVerified = true;
        state.userDetails = action.payload.data.data;
        state.isOptSend = false;
        state.Authorization = action.payload.data.Authorization;
      }
    },

    [updateAuthorization.fulfilled]: (state, action) => {
      state.Authorization = action.payload;
    },
    [verifyUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [verifyUser.rejected]: (state, action) => {
      state.isFetching = false;
      if (action.payload.message == "Invalid OTP!") {
        state.error = true;
        state.errorMessage = action.payload.message;
      }
    },
    [verifyUser.fulfilled]: (state, action) => {
      if (action.payload.message == "Success") {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(action.payload.verified.user)
        );
        localStorage.setItem(
          "Authorization",
          action.payload.verified.Authorization
        );
        state.isVerified = true;
        state.userDetails = action.payload.verified.user;
        state.isOptSend = false;
        state.Authorization = true;
      }
      if (
        action.payload.message.includes("sent successfully! Valid for 10mins.")
      ) {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.isOptSend = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
      state.isFetching = false;
    },
    [verifyUser1.pending]: (state, action) => {
      state.isFetching = true;
    },
    [verifyUser1.rejected]: (state, action) => {
      state.isFetching = false;
      if (action.payload.message == "Invalid OTP!") {
        state.error = true;
        state.errorMessage = action.payload.message;
      }
    },
    [verifyUser1.fulfilled]: (state, action) => {
      if (action.payload.message == "Success") {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(action.payload.data)
        );
        state.isVerified = true;
        state.userDetails = action.payload.data;
        state.isOptSend = false;
        state.Authorization = true;
      }
      if (
        action.payload.message.includes("sent successfully! Valid for 10mins.")
      ) {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.isOptSend = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
      state.isFetching = false;
    },

    // GET Users
    [GetUserList.pending]: (state, action) => {
      state.isFetching = true;
    },
    [GetUserList.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [GetUserList.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.usersList = action.payload.data;
    },

    // GET ClientSecret
    [getClientSecret.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getClientSecret.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [getClientSecret.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.paymentRedirect = action.payload.data;
    },

    // GET Subscriptions
    [GetSubscriptions.pending]: (state, action) => {
      state.isFetching = true;
    },
    [GetSubscriptions.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [GetSubscriptions.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.subscriptions = action.payload.data;
    },

    [findUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.nonPos = action.payload;
    },
    [updateProfile.pending]: (state, action) => {
      state.isFetching = true;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.userDetails = action.payload.data;
      localStorage.setItem("userDetails", JSON.stringify(action.payload.data));
      alert("Profile updated successfully.");
    },

    // Send Email
    [sendEmail.pending]: (state, action) => {
      state.isFetching = true;
    },
    [sendEmail.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [sendEmail.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.emailSent = true;
    },

    [updateUserRoles.pending]: (state, action) => {
      state.isFetching = true;
    },
    [updateUserRoles.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [updateUserRoles.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.roles = action.payload.data.roles;
      alert("Role updated successfully.");
    },

    [resendOTP.fulfilled]: (state, action) => {
      if (
        action.payload.message.includes("sent successfully! Valid for 10mins.")
      ) {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.isOptSend = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
      state.isFetching = false;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      if (action.payload.message.includes("Success")) {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.email = action.payload.email;
        state.isOptSend = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
      state.isFetching = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      if (action.payload.message.includes("Success")) {
        let result = action.payload.message.substr(4, 4);
        state.isFetching = false;
        state.error = null;
        state.otp = result;
        state.passwordChanged = true;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
      }
      state.isFetching = false;
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
    [resetRedux.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.isOptSend = false;
      state.name = null;
      state.phone = null;
      state.user = null;
      state.token = null;
      state.isSignUp = false;
      state.otp = null;
      state.errorMessage = "";
      state.isVerified = false;
      state.userDetails = {};
      state.Authorization = false;
    },
  },
});

export const {
  logout,
  setLoginRedirectUrl,
  setIsSignUp,
  sendOTP,
  addToCart,
  removeFromCart,
} = counterSlice.actions;
export default counterSlice.reducer;
