import { AuthenAPI } from "@/apis/AuthenAPI";
import type SignupDTO from "@/apis/DTO/SignupDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthenticationState {
  isSuccess: boolean;
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
  isSuccess: !!window.localStorage.getItem("token"),
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
      console.error("Signup AsynThunk Error:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const signin = createAsyncThunk(
  "authentication/signin",
  async (data: { email: string; password: string }, thunkApi) => {
    console.log("Signin AsyncThunk Data:");
    try {
      const response = await AuthenAPI.signin(data);
      return response;
    } catch (error) {
      console.error("Signin AsynThunk Error:", error);
      return thunkApi.rejectWithValue(
        "Uh oh! Something went wrong. Please try again later."
      );
    }
  }
);

const authenSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.errors = {};
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.jwt = action.payload.token;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
        window.localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSuccess = false;
        state.jwt = null;
        console.error("Error in extraReducers:", action);
        if ((action.payload as any).title == "DuplicateUserName") {
          state.errors.email = "This email is already registered.";
        }
      });

    builder
      .addCase(signin.fulfilled, (state, action) => {
        console.log("Run here");
        state.isSuccess = true;
        state.jwt = action.payload.token;
        state.user = {
          userId: action.payload.userId,
          fullname: action.payload.fullname,
          email: action.payload.email,
        };
        window.localStorage.setItem("token", action.payload.token);
      })
      .addCase(signin.rejected, (state, action) => {
        console.log("Run because api failed");
        state.isSuccess = false;
        state.jwt = null;
        console.error("Error in signin extraReducers:", action);
      });
  },
});

export default authenSlice.reducer;
export { signin, signup };

