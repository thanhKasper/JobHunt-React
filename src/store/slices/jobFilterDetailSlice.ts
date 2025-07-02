import type JobDetailDTO from "@/apis/DTO/JobDetailDTO";
import type JobFilterDTO from "@/apis/DTO/JobFilterDTO";
import JobApi from "@/apis/JobApi";
import JobFilterApi from "@/apis/JobFilterApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { logout } from "./authenticationSlice";

interface JobFilterDetailState {
  jobFilterState: "idle" | "loading" | "succeeded" | "failed";
  jobFilter: JobFilterDTO;
  jobsFromFilterState: "idle" | "loading" | "succeeded" | "failed";
  jobsFromFilter: JobDetailDTO[];
}

const initialState: JobFilterDetailState = {
  jobFilterState: "idle",
  jobFilter: {
    jobFilterId: "",
    title: "",
    isActive: false,
    isStarred: false,
    averageCompatibility: 0,
    occupation: "",
    location: "",
    level: "",
    yearsOfExperience: 0,
    technicalKnowledge: [],
    softSkills: [],
    tools: [],
    languages: [],
    totalJobs: 0,
  },
  jobsFromFilterState: "idle",
  jobsFromFilter: [],
};

const getJobFilter = createAsyncThunk(
  "jobFilterDetail/getJobFilter",
  async (jobFilterId: string, thunkApi) => {
    try {
      const response = await JobFilterApi.getJobFilter(jobFilterId);
      return thunkApi.fulfillWithValue(response);
    } catch (err) {
      if (((err as AxiosError).status = 452))
        return thunkApi.dispatch(logout());
    }
  }
);

const getJobsBaseOnFilter = createAsyncThunk(
  "jobFilterDetail/getJobsBaseOnFilter",
  async (jobFilterId: string, thunkApi) => {
    try {
      const response = await JobApi.getJobsBaseOnFilter(jobFilterId);
      return response;
    } catch (err) {
      if ((err as AxiosError).status == 452) return thunkApi.dispatch(logout());
    }
  }
);

const jobFilterDetailSlice = createSlice({
  name: "jobFilterDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobFilter.pending, (state) => {
        // Optionally handle pending state
        state.jobFilterState = "loading";
      })
      .addCase(getJobFilter.fulfilled, (state, action) => {
        state.jobFilterState = "succeeded";
        state.jobFilter = action.payload as JobFilterDTO;
      })
      .addCase(getJobFilter.rejected, (state, action) => {
        state.jobFilterState = "failed";
        console.error("Failed to fetch job filter:", action.error);
      });

    builder
      .addCase(getJobsBaseOnFilter.pending, (state) => {
        // Optionally handle pending state
        state.jobsFromFilterState = "loading";
      })
      .addCase(getJobsBaseOnFilter.fulfilled, (state, action) => {
        state.jobsFromFilterState = "succeeded";
        state.jobsFromFilter = action.payload as JobDetailDTO[];
      })
      .addCase(getJobsBaseOnFilter.rejected, (state, action) => {
        state.jobsFromFilterState = "failed";
        console.error("Failed to fetch jobs based on filter:", action.error);
      });
  },
});

export const {} = jobFilterDetailSlice.actions;
export { getJobFilter, getJobsBaseOnFilter };
export default jobFilterDetailSlice.reducer;
