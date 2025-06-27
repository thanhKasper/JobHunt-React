import type JobFilterCreationDTO from "@/apis/DTO/JobFilterCreationDTO";
import JobFilterApi from "@/apis/JobFilterApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface JobFilterCreateState {
  //   jobFilterForm: JobFilterDTO;
  errors: Record<keyof JobFilterCreationDTO, string[]>;
  state: "idle" | "loading" | "succeeded" | "failed";
}

const createNewJobFilter = createAsyncThunk(
  "jobFilterCreate/createNewJobFilter",
  async (jobFilter: JobFilterCreationDTO) => {
    try {
      const message = await JobFilterApi.createJobFilter(jobFilter);
      //   console.log("New job filter created successfully:", message);
      return message;
    } catch (error) {
      console.error("Error creating new job filter:", error);
      throw error;
    }
  }
);

const jobFilterCreateSlice = createSlice({
  name: "jobFilterCreate",
  initialState: {
    state: "idle",
    // jobFilterForm: {},
    errors: {},
  } as JobFilterCreateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewJobFilter.pending, (state) => {
        // Handle pending state if needed
        state.state = "loading";
      })
      .addCase(createNewJobFilter.fulfilled, (state, action) => {
        // Handle successful creation of job filter
        console.log("Job filter created:", action.payload);
        // state.isSuccess = true;
        state.state = "succeeded";
      })
      .addCase(createNewJobFilter.rejected, (state, action) => {
        // Handle error in job filter creation
        state.state = "failed";
        console.log(action);
        console.error("Failed to create job filter:", action.error.message);
      });
  },
});

export const {} = jobFilterCreateSlice.actions;
export { createNewJobFilter };
export default jobFilterCreateSlice.reducer;
