// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  dashboardData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    // New reducer for storing dashboard data
  
    DashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});
export const SubmitLoginInfo = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    // dispatch(log());

    // Make your API call for authentication here
    // For example, using fetch:
    const response = await fetch(
      "https://partneruat-backend.paymentsave.co.uk/api/v1/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const data = await response.json();
    console.log("data", data);
    if (response.ok) {
      dispatch(loginSuccess(data.data));
      cookie.set("access_token", data.data.token, { expires: 7, path: "/" }); // Set the cookie to expire in 1 day (adjust as needed)
      // localStorage.setItem("access_token", data.data.token); // Assuming your API returns user data upon successful login
    } else {
      dispatch(loginFailure(data.error)); // Assuming your API returns an error message upon failed login
    }
  } catch (error) {
    console.error("An error occurred during sign-in:", error);
    dispatch(loginFailure("An unexpected error occurred."));
  }
};
export const GetDashboardData2 =
  (url, options = {}) =>
  async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("access_token");

      console.log(token);
      //   const { token } = getState().auth;

      if (!token) {
        throw new Error("No access token available");
      }

      // Include the access token in the Authorization header
      const headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
      };

      const response = await fetch(
        `
        https://partneruat-backend.paymentsave.co.uk/api/v1/auth/dashboard/`,
        { ...options, headers }
      );
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        // Dispatch the action to set the dashboard data in the state
        dispatch(setDashboardData(data));
        return data;
      } else {
        throw new Error(data.error || "An error occurred during the API call");
      }
    } catch (error) {
      console.error("An error occurred during the API call:", error);
      throw error;
    }
  };
  export const GetDashboardData = () => async (dispatch) => {
    const url = `https://partneruat-backend.paymentsave.co.uk/api/v1/auth/dashboard/`;
  
    try {
      const response = await axios.get(url);
  
      if (response.data.status) {
        dispatch(setDashboardData(response.data.data));
      } else {
        // Handle the case where the server responds with an error
        // You might dispatch an action to set an error state or show an error message
      }
    } catch (error) {
      // Handle network errors or unexpected errors during the request
      // You might dispatch an action to set an error state or show an error message
      console.error('Error fetching dashboard data:', error);
    }
  };
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
