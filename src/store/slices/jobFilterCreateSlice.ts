import type JobFilterCreationDTO from "@/apis/DTO/JobFilterCreationDTO";
import JobFilterApi from "@/apis/JobFilterApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const validationErrors = (error as any).errors as Record<
        string,
        string[]
      >;
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
    errors: {},
  } as JobFilterCreateState,
  reducers: {},
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

export const {} = jobFilterCreateSlice.actions;
export { createNewJobFilter };
export default jobFilterCreateSlice.reducer;
