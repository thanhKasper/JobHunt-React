import { AuthenAPI } from "@/apis/AuthenAPI";
import type SignupDTO from "@/apis/DTO/SignupDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthenticationState {
  isAuthenticated: boolean;
  jwt: string | null;
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

const initialState: AuthenticationState = {
  isAuthenticated: !!window.localStorage.getItem("token"),
  jwt: window.localStorage.getItem("token") || null,
  user: {
    userId: "",
    fullname: "",
    email: "",
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.jwt = action.payload.token;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
        window.localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.jwt = null;
        if ((action.payload as any).title == "DuplicateUserName") {
          state.errors.email = "This email is already registered.";
        }
      });

    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.jwt = action.payload.token;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
        window.localStorage.setItem("token", action.payload.token);
      })
      .addCase(signin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.jwt = null;
        state.errors.general = (action.payload as any).description;
      });
  },
});

export default authenSlice.reducer;
export { signin, signup };
