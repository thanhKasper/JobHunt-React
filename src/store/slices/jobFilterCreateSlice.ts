import type JobFilterCreationDTO from "@/apis/DTO/JobFilterCreationDTO";
import JobFilterApi from "@/apis/JobFilterApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { logout } from "./authenticationSlice";

interface JobFilterCreateState {
  errors: Record<keyof JobFilterCreationDTO, string[]>;
  state: "idle" | "loading" | "succeeded" | "failed";
}

const createNewJobFilter = createAsyncThunk(
  "jobFilterCreate/createNewJobFilter",
  async (jobFilter: JobFilterCreationDTO, thunkApi) => {
    try {
      await JobFilterApi.createJobFilter(jobFilter);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status == 452) return thunkApi.dispatch(logout()); // logout when refresh token is expired
      const validationErrors = (axiosError.response?.data as any)
        .errors as Record<string, string[]>;
      return thunkApi.rejectWithValue({
        jobFilterName: validationErrors["FilterTitle"],
        expectedExp: validationErrors["YearsOfExperience"],
        filterOccupation: validationErrors["Occupation"],
      } as Record<string, string[]>);
    }
  }
);

const jobFilterCreateSlice = createSlice({
  name: "jobFilterCreate",
  initialState: {
    state: "idle",
    errors: {},
  } as JobFilterCreateState,
  reducers: {
    jobfilterFormSwitchToNormal: (state) => {
      state.state = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewJobFilter.fulfilled, (state) => {
        state.state = "succeeded";
      })
      .addCase(createNewJobFilter.rejected, (state, action) => {
        state.state = "failed";
        state.errors = action.payload as any;
      });
  },
});

export const {jobfilterFormSwitchToNormal} = jobFilterCreateSlice.actions;
export { createNewJobFilter };
export default jobFilterCreateSlice.reducer;
