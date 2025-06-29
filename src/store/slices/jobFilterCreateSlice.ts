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
  async (jobFilter: JobFilterCreationDTO, thunkApi) => {
    console.log("Create job filter with dat: ", jobFilter);
    try {
      await JobFilterApi.createJobFilter(jobFilter);
    } catch (error) {
      const validationErrors = (error as any).errors as Record<
        string,
        string[]
      >;
      console.error("Error creating new job filter:", validationErrors);
      return thunkApi.rejectWithValue({
        jobFilterName: validationErrors["FilterTitle"],
        expectedExp: validationErrors["YearsOfExperience"],
        filterOccupation: validationErrors["Occupation"]
      } as Record<string, string[]>);
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
      .addCase(createNewJobFilter.fulfilled, (state) => {
        // Handle successful creation of job filter
        console.log("Job filter created:");
        // state.isSuccess = true;
        state.state = "succeeded";
      })
      .addCase(createNewJobFilter.rejected, (state, action) => {
        console.log("Handle reject form createNewJobFilter async thunk")
        // Handle error in job filter creation
        state.state = "failed";
        console.log(action);
        state.errors = action.payload as any;
      });
  },
});

export const {} = jobFilterCreateSlice.actions;
export { createNewJobFilter };
export default jobFilterCreateSlice.reducer;
