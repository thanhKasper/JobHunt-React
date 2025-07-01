import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { ProjectApi } from "@/apis/ProjectApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { logout } from "./authenticationSlice";

interface ProjectUpdateState {
  updatedProject: ProjectDTO;
  projectsLoadingState: FetchingState;
}

const editProject = createAsyncThunk(
  "project/editProject",
  async (project: ProjectDTO, thunkApi) => {
    try {
      return await ProjectApi.updateProject(project);
    } catch (err) {
      if ((err as any).status === 452) thunkApi.dispatch(logout());
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
      if ((err as any).status === 452) thunkApi.dispatch(logout());
    }
  }
);

export const projectUpdateSlice = createSlice({
  name: "projectUpdate",
  initialState: {
    updatedProject: {} as ProjectDTO,
    projectsLoadingState: "idle",
    previousProjects: {} as ProjectDTO,
  } as ProjectUpdateState,
  reducers: {
    updateProjectField: (state, action: PayloadAction<ProjectDTO>) => {
      state.updatedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProject.pending, (state) => {
        state.projectsLoadingState = "loading";
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.updatedProject = action.payload as ProjectDTO;
        state.projectsLoadingState = "succeeded";
      })
      .addCase(editProject.rejected, (state) => {
        state.projectsLoadingState = "failed";
      });

    builder.addCase(getProjectDetail.fulfilled, (state, action) => {
      state.projectsLoadingState = "succeeded";
      state.updatedProject = action.payload as ProjectDTO;
    });
  },
});

export default projectUpdateSlice.reducer;
export const { updateProjectField } = projectUpdateSlice.actions;
export { editProject, getProjectDetail };
