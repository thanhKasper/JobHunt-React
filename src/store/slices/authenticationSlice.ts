import { AuthenAPI } from "@/apis/AuthenAPI";
import type SignupDTO from "@/apis/DTO/SignupDTO";
import { ProfileApi } from "@/apis/ProfileApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthenticationState {
  isAuthenticated: boolean;
  user: {
    userId: string;
    fullname: string;
    email: string;
  };
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
}

const simpleProfile = await ProfileApi.getSimpleProfile();

const initialState: AuthenticationState = {
  isAuthenticated: !!window.localStorage.getItem("token"),
  user: {
    userId: simpleProfile?.userId ?? "",
    fullname: simpleProfile?.fullName ?? "",
    email: simpleProfile?.email ?? "",
  },
  errors: {},
};

const signup = createAsyncThunk(
  "authentication/signup",
  async (data: SignupDTO, thunkApi) => {
    try {
      const response = await AuthenAPI.signup(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const signin = createAsyncThunk(
  "authentication/signin",
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      const response = await AuthenAPI.signin(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authenSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        if ((action.payload as any).title == "DuplicateUserName") {
          state.errors.email = "This email is already registered.";
        }
      });

    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
      })
      .addCase(signin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.errors.general = (action.payload as any).description;
      });
  },
});

export default authenSlice.reducer;
export { signin, signup };
export const { logout } = authenSlice.actions;
