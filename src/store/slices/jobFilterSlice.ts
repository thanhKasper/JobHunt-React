import type JobFilterDTO from "@/apis/DTO/JobFilterDTO";
import JobFilterApi from "@/apis/JobFilterApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import type { AxiosError } from "axios";
import { logout } from "./authenticationSlice";

interface JobFilterState {
  state: FetchingState;
  filterTotal: number;
  activeFilterTotal: number;
  jobFilters: JobFilterDTO[];
  filteredJobFilters: JobFilterDTO[];
}

// Logic: inactive filters cannot have star. both FE and BE should handle this logic.

const deleteJobFilter = createAsyncThunk(
  "jobFilter/deleteJobFilter",
  async (jobFilterId: string, thunkApi) => {
    try {
      return await JobFilterApi.deleteJobFilter(jobFilterId);
    } catch (err) {
      if ((err as AxiosError).status == 452) return thunkApi.dispatch(logout());
    }
  }
);

const toggleJobFilterStar = createAsyncThunk(
  "jobFilter/toggleJobFilterStar",
  async (jobFilterId: string, thunkApi) => {
    try {
      await JobFilterApi.toggleJobFilterStar(jobFilterId);
      return jobFilterId;
    } catch (err) {
      if ((err as AxiosError).status == 452) return thunkApi.dispatch(logout());
    }
  }
);
const toggleJobFilterActiveState = createAsyncThunk(
  "jobFilter/toggleJobFilterActiveState",
  async (jobFilterId: string, thunkApi) => {
    try {
      await JobFilterApi.toggleJobFilterActiveState(jobFilterId);
      return jobFilterId;
    } catch (err) {
      if ((err as AxiosError).status == 452) return thunkApi.dispatch(logout());
    }
  }
);
const getGeneralJobFilterPage = createAsyncThunk(
  "jobFilter/getGeneralJobFilterPage",
  async (_, thunkApi) => {
    try {
      const { totalJobFilters, activeJobFilters, jobFilters } =
        await JobFilterApi.getJobFilters();
      return {
        state: "succeeded",
        filterTotal: totalJobFilters,
        activeFilterTotal: activeJobFilters,
        jobFilters: jobFilters,
        filteredJobFilters: jobFilters,
      };
    } catch (err) {
      if ((err as AxiosError).status == 452) return thunkApi.dispatch(logout());
    }
  }
);

const jobFilterSlice = createSlice({
  name: "jobFilter",
  initialState: {
    state: "idle",
    activeFilterTotal: 0,
    filterTotal: 0,
    jobFilters: [],
    filteredJobFilters: [],
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
      const { filterTotal, activeFilterTotal, jobFilters } =
        action.payload as JobFilterState;
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

    // All the not UI-related design logic will be handled here -> Single Responsibility Principle
    builder.addCase(toggleJobFilterStar.fulfilled, (state, action) => {
      const jobFilterId = action.payload;
      const toggledFilter = state.jobFilters.find(
        (filter) => filter.jobFilterId === jobFilterId
      );

      // if not found return as usual
      if (!toggledFilter) return state;

      toggledFilter.isStarred = !toggledFilter.isStarred;
      toggledFilter.isActive = true; // True as any case
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
  deleteJobFilter,
  getGeneralJobFilterPage,
  toggleJobFilterActiveState,
  toggleJobFilterStar,
};
export const { filterJobFilters } = jobFilterSlice.actions;
