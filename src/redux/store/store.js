const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "../feature/authSlice";
import checkReducer from "../feature/checkboxSlice"
import clearReducer from "../feature/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checked:checkReducer,
    clearError:clearReducer
  },
});
