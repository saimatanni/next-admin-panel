const { configureStore } = require("@reduxjs/toolkit");
import authSlice from "./authSlice";
import userReducer from "./slice";
import todoReducer from "./todoSlice";
export const store = configureStore({
  reducer:{
    loginInfo:authSlice,
    userInfo:userReducer,
    todoInfo:todoReducer
  }
});
