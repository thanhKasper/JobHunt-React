import type JobFilterDTO from "@/apis/DTO/JobFilterDTO";
import JobFilterApi from "@/apis/JobFilterApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface JobFilterState {
  filterTotal: number;
  activeFilterTotal: number;
  jobFilters: JobFilterDTO[];
  filteredJobFilters: JobFilterDTO[];
}

// Logic: inactive filters cannot have star. both FE and BE should handle this logic.

const [totalFilters, activeFilters, jobFilters] = await Promise.all([
  JobFilterApi.getTotalJobFilters(),
  JobFilterApi.getActiveJobFilters(),
  JobFilterApi.getJobFilters(),
]);

const deleteJobFilter = createAsyncThunk(
  "jobFilter/deleteJobFilter",
  async (jobFilterId: string) => {
    return await JobFilterApi.deleteJobFilter(jobFilterId);
  }
);
const createJobFilter = createAsyncThunk(
  "jobFilter/createJobFilter",
  async (jobFilter: JobFilterDTO) => {
    // Logic to create a job filter
    // This is a placeholder; replace with actual API call
    return await JobFilterApi.createJobFilter(jobFilter);
  }
);
const toggleJobFilterStar = createAsyncThunk(
  "jobFilter/toggleJobFilterStar",
  async (jobFilterId: string) => {
    // Logic to toggle the start state of a job filter
    // This is a placeholder; replace with actual API call
    return await JobFilterApi.toggleJobFilterStar(jobFilterId);
  }
);
const toggleJobFilterActiveState = createAsyncThunk(
  "jobFilter/toggleJobFilterActiveState",
  async (jobFilterId: string) => {
    // Logic to toggle the active state of a job filter
    // This is a placeholder; replace with actual API call
    return await JobFilterApi.toggleJobFilterActiveState(jobFilterId);
  }
);
const getGeneralJobFilterPage = createAsyncThunk(
  "jobFilter/getGeneralJobFilterPage",
  async (): Promise<JobFilterState> => {
    // Logic to fetch the general job filter page
    // This is a placeholder; replace with actual API call
    const totalFilters = await JobFilterApi.getTotalJobFilters();
    const activeFilters = await JobFilterApi.getActiveJobFilters();
    const jobFilters = await JobFilterApi.getJobFilters();
    return {
      filterTotal: totalFilters, // Mocked value, replace with actual API call
      activeFilterTotal: activeFilters, // Mocked value, replace with actual API call
      jobFilters: jobFilters, // Mocked value, replace with actual API call
      filteredJobFilters: jobFilters, // Initially, all filters are shown
    };
  }
);

const jobFilterSlice = createSlice({
  name: "jobFilter",
  initialState: {
    activeFilterTotal: activeFilters,
    filterTotal: totalFilters,
    jobFilters: jobFilters,
    filteredJobFilters: jobFilters,
  } as JobFilterState,
  reducers: {
    filterJobFilters: (state, action: PayloadAction<string>) => {
      // The problem is after filter, the current jobFilters is modified
      // Therefore we cannot use that modified array to filter again.
      // Use this to reduce the number of times we called to the backend => improve performance

      state.filteredJobFilters = state.jobFilters.filter((filter) => {
        const filterType = action.payload;
        if (filterType === "Tất cả") return true;
        if (filterType === "Đang hoạt động") return filter.isActive;
        if (filterType === "Tạm dừng") return !filter.isActive;
        if (filterType === "Yêu thích") return filter.isStarred;
        return false; // Default case, should not happen
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGeneralJobFilterPage.fulfilled, (state, action) => {
      const { filterTotal, activeFilterTotal, jobFilters } = action.payload;
      return {
        ...state,
        filterTotal,
        activeFilterTotal,
        jobFilters,
        filteredJobFilters: jobFilters,
      };
    });

    builder.addCase(deleteJobFilter.fulfilled, (state, action) => {
      const jobFilterId = action.payload;
      return {
        ...state,
        jobFilters: state.jobFilters.filter(
          (filter) => filter.jobFilterId !== jobFilterId
        ),
        filteredJobFilters: state.filteredJobFilters.filter(
          (filter) => filter.jobFilterId !== jobFilterId
        ),
      };
    });

    builder.addCase(createJobFilter.fulfilled, (state, action) => {
      const newJobFilter = action.payload;
      return {
        ...state,
        jobFilters: [...state.jobFilters, newJobFilter],
        filteredJobFilters: [...state.filteredJobFilters, newJobFilter],
      };
    });

    // All the not UI-related design logic will be handled here -> Single Responsibility Principle
    builder.addCase(toggleJobFilterStar.fulfilled, (state, action) => {
      const jobFilterId = action.payload;
      const toggledFilter = state.jobFilters.find(
        (filter) => filter.jobFilterId === jobFilterId
      );

      // if not found return as usual
      if (!toggledFilter) return state;

      toggledFilter.isStarred = !toggledFilter.isStarred;
      // remove the starred filter from the list to push it to the top
      state.jobFilters = state.jobFilters.filter(
        (jobfilter) => jobfilter.jobFilterId !== jobFilterId
      );
      // find the first unstarred filter
      const firstUnstarredIndex = state.jobFilters.findIndex(
        (filter) => !filter.isStarred
      );
      if (toggledFilter.isStarred) {
        state.jobFilters.unshift(toggledFilter);
      } else {
        if (firstUnstarredIndex !== -1) {
          state.jobFilters.splice(firstUnstarredIndex, 0, toggledFilter);
        } else {
          state.jobFilters.push(toggledFilter);
        }
      }

      state.filteredJobFilters = state.jobFilters;
    });

    builder.addCase(toggleJobFilterActiveState.fulfilled, (state, action) => {
      const jobFilterId = action.payload;
      const toggledFilter = state.jobFilters.find(
        (filter) => filter.jobFilterId === jobFilterId
      );
      // if not found return as usual
      if (!toggledFilter) return state;

      toggledFilter.isActive = !toggledFilter.isActive;
      // Automatically unstar the filter is the filter is deactivated
      if (!toggledFilter.isActive) toggledFilter.isStarred = false;
      // remove the deactivated filter from the list to push it to the bottom
      state.jobFilters = state.jobFilters.filter(
        (filter) => filter.jobFilterId !== jobFilterId
      );
      // find the first deactivated filter
      const firstDeactivatedIndex = state.jobFilters.findIndex(
        (filter) => !filter.isActive
      );
      if (firstDeactivatedIndex !== -1) {
        state.jobFilters.splice(firstDeactivatedIndex, 0, toggledFilter);
      } else {
        state.jobFilters.push(toggledFilter);
      }

      state.filteredJobFilters = state.jobFilters;
    });
  },
});

export default jobFilterSlice.reducer;
export {
  createJobFilter,
  deleteJobFilter,
  getGeneralJobFilterPage,
  toggleJobFilterActiveState,
  toggleJobFilterStar,
};
export const { filterJobFilters } = jobFilterSlice.actions;
