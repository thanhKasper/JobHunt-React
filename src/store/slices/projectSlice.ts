import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { ProjectApi } from "@/apis/ProjectApi";
import type { AxiosError } from "axios";
import { logout } from "./authenticationSlice";

interface ProjectState {
  totalProjects: number;
  totalCompletedProjects: number;
  toolsCount: number;
  rolesCount: number;
  mainTechnologies: string[];
  projects: ProjectDTO[];
  projectsLoadingState: FetchingState;
  currentProject: ProjectDTO;
}



const getProjectGeneral = createAsyncThunk(
  "project/getProjectGeneral",
  async (_, thunkApi) => {
    try {
      return await ProjectApi.getGeneralInfo();
    } catch (err) {
      if ((err as AxiosError).status == 542) {
        thunkApi.dispatch(logout());
      }
    }
  }
);

const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_, thunkApi) => {
    try {
      const projects = await ProjectApi.getProjects();
      return projects;
    } catch (err) {
      if ((err as AxiosError).status == 452) thunkApi.dispatch(logout());
    }
  }
);

const getProjectDetail = createAsyncThunk(
  "project/getProjectDetail",
  async (id: string, thunkApi) => {
    try {
      const project = await ProjectApi.getProject(id);
      return project;
    } catch (err) {
      if ((err as AxiosError).status == 452) thunkApi.dispatch(logout());
    }
  }
);

const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id: string, thunkApi) => {
    try {
      await ProjectApi.deleteProject(id);
    } catch (err) {
      if ((err as AxiosError).status == 452) thunkApi.dispatch(logout());
    }
  }
);

// Later development, should use api to fetch the exact project data, better, maybe create its own slice.

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectsLoadingState: "idle",
    totalProjects: 0,
    totalCompletedProjects: 0,
    toolsCount: 0,
    rolesCount: 0,
    mainTechnologies: [],
    projects: [],
    currentProject: {} as ProjectDTO,
  } as ProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectGeneral.fulfilled, (state, action) => {
      const {
        mostUsedTech,
        totalCompleteProjects,
        totalProjects,
        totalRoles,
        totalUsedTools,
      } = action.payload as any;
      state.mainTechnologies = mostUsedTech;
      state.totalCompletedProjects = totalCompleteProjects;
      state.totalProjects = totalProjects;
      state.rolesCount = totalRoles;
      state.toolsCount = totalUsedTools;
    });

    builder.addCase(getProjects.fulfilled, (status, action) => {
      status.projects = action.payload as any;
    });

    builder
      .addCase(getProjectDetail.pending, (state) => {
        state.projectsLoadingState = "loading";
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.currentProject = action.payload as ProjectDTO;
        state.projectsLoadingState = "succeeded";
      });

    builder.addCase(deleteProject.fulfilled, (state, _) => {
      state.projectsLoadingState = "succeeded";
    });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
export {
  getProjectGeneral,
  getProjects,
  getProjectDetail,
  deleteProject,
};
