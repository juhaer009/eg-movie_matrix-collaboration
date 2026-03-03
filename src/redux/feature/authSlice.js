import { auth } from "@/Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  loading: null,
  error: null,
};

const googleProvider = new GoogleAuthProvider();

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

// export const googleLogin = createAsyncThunk(
//   "auth/googleLogin",
//   async (_, { rejectWithValue }) => {
//     try {
//       await signInWithRedirect(auth, googleProvider);
//     } catch (error) {
//       return rejectWithValue(error.code);
//     }
//   },
// );

// export const getGoogleRedirectUser = createAsyncThunk(
//   "auth/getGoogleRedirectUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await getRedirectResult(auth);
//       if (result?.user) {
//         return result.user;
//       }
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.code);
//     }
//   },
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthuser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // builder
    //   .addCase(getGoogleRedirectUser.fulfilled, (state, action) => {
    //     if (action.payload) {
    //       state.user = action.payload;
    //     }
    //   })
    //   .addCase(getGoogleRedirectUser.rejected, (state, action) => {
    //     state.error = action.payload;
    //   });
  },
  
});

export const { setAuthuser, clearError } = authSlice.actions;
export default authSlice.reducer;
