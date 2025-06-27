import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { ProjectApi } from "@/apis/ProjectApi";

interface ProjectState {
  totalProjects: number;
  totalCompletedProjects: number;
  toolsCount: number;
  rolesCount: number;
  mainTechnologies: string[];
  projects: ProjectDTO[];
  projectsLoadingState: FetchingState;
}

const [
  totalProjects,
  totalCompletedProjects,
  projects,
  mainTechnologies,
  toolsCount,
  rolesCount,
] = await Promise.all([
  ProjectApi.getTotalProjects(),
  ProjectApi.getCompletedProjects(),
  ProjectApi.getProjects(),
  ProjectApi.getMainTechnologies(),
  ProjectApi.getToolsCount(),
  ProjectApi.getRolesCount(),
]);

const editProject = createAsyncThunk(
  "project/editProject",
  async (project: ProjectDTO) => {
    return await ProjectApi.updateProject(project);
  }
);

// Later development, should use api to fetch the exact project data, better, maybe create its own slice.

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectsLoadingState: "idle",
    totalProjects: totalProjects,
    totalCompletedProjects: totalCompletedProjects,
    toolsCount: toolsCount,
    rolesCount: rolesCount,
    mainTechnologies: mainTechnologies,
    projects: projects,
  } as ProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProject.pending, (state) => {
        state.projectsLoadingState = "loading";
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.projects.findIndex(
          (p) => p.projectId === updatedProject.projectId
        );
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
        state.projectsLoadingState = "idle";
      })
      .addCase(editProject.rejected, (state) => {
        state.projectsLoadingState = "failed";
      });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
export { editProject };
