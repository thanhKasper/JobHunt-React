import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { createSlice } from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { ProjectApi } from "@/apis/ProjectApi";

interface ProjectState {
    totalProjects: number;
    totalCompletedProjects: number;
    toolsCount:number;
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
    rolesCount
] = await Promise.all([
    ProjectApi.getTotalProjects(),
    ProjectApi.getCompletedProjects(),
    ProjectApi.getProjects(),
    ProjectApi.getMainTechnologies(),
    ProjectApi.getToolsCount(),
    ProjectApi.getRolesCount(),
])

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
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
