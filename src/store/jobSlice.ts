import type JobDTO from "@/apis/DTO/JobDTO";
import JobApi from "@apis/JobApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const PAGE_SIZE = 10;

interface JobState {
  status: "idle" | "loading" | "succeeded" | "failed" | "filtered"; // use this as a way to reload the JobState when needed
  totalPages: number;
  currentPage: number;
  pageSize: number;
  todayNewJobs: number;
  totalJobs: number;
  searchKeyword: string; // used for pagination on filtering jobs
  filterIdList: string[]; // used for pagination on filtering jobs
  todayCompatibilityPercentage: number;
  jobs: Array<JobDTO>;
}

const getJobsWithSearchAndFilter = createAsyncThunk(
  "job/getJobsWithSearchAndFilter",
  async (arg: {
    keyword: string | undefined;
    filterIdList: string[];
    position: number;
  }) => {
    const jobs = await JobApi.getJobsWithSearchAndFilter(
      arg.keyword,
      arg.filterIdList,
      arg.position
    );

    return jobs;
  }
);

const reloadJobPage = createAsyncThunk(
  "job/reloadJobPage",
  async (): Promise<JobState> => {
    const [todayJobs, totalJobs, compatiblePercentage, jobs] =
      await Promise.all([
        JobApi.getTodayNewJobs(),
        JobApi.getTotalJobs(),
        JobApi.getTodayCompatibilityPercentage(),
        JobApi.getFirstTenLatestJobs(),
      ]);
    return {
      status: "succeeded",
      totalJobs: totalJobs,
      todayNewJobs: todayJobs,
      currentPage: 1,
      totalPages: Math.ceil(totalJobs / PAGE_SIZE),
      pageSize: PAGE_SIZE,
      todayCompatibilityPercentage: compatiblePercentage,
      jobs: jobs,
      searchKeyword: "",
      filterIdList: [],
    };
  }
);

// After some research, it seems that redux can be used as a way to caching data or
// preloading data if needed to improve performance.
// However, with the size and scope of this project, I will use redux to
// get used to it first, and then I will improve the performance later.
const jobSlice = createSlice({
  name: "job",
  initialState: {
    status: "idle",
    totalPages: 0,
    currentPage: 1, // Start from page 1
    pageSize: PAGE_SIZE,
    todayNewJobs: 0,
    totalJobs: 0,
    todayCompatibilityPercentage: 0,
    searchKeyword: "",
    filterIdList: [],
    jobs: [],
  } as JobState,
  reducers: {
    updateSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    updateFilterIdList: (state, action: PayloadAction<string[]>) => {
      state.filterIdList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobsWithSearchAndFilter.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getJobsWithSearchAndFilter.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
      state.totalJobs = action.payload.total;
      state.totalPages = Math.ceil(action.payload.total / state.pageSize);
      state.currentPage = action.payload.position; // Reset to first page when new jobs are fetched
      state.status = "succeeded";
    });

    builder.addCase(reloadJobPage.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
  },
});

export const { updateSearchKeyword, updateFilterIdList } = jobSlice.actions;
export { getJobsWithSearchAndFilter, reloadJobPage };
export default jobSlice.reducer;
