import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { ProjectApi } from "@/apis/ProjectApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";

interface ProjectNewState {
  createState: FetchingState;
  newProject: ProjectDTO;
  errors: Record<keyof ProjectDTO, string[]>;
}

const createNewProject = createAsyncThunk(
  "projectNew/createNewProject",
  async (projectData: ProjectDTO) => {
    return await ProjectApi.createProject(projectData);
  }
);

export const projectNewSlice = createSlice({
  name: "projectNew",
  initialState: {
    createState: "idle",
    errors: {} as Record<keyof ProjectDTO, string[]>,
    newProject: {
      projectId: "",
      projectName: "",
      projectDescription: "",
      roles: [],
      startDate: "",
      endDate: undefined,
      techOrSkills: [],
      projectLink: undefined,
      features: [],
      liveDemoLink: undefined,
    },
  } as ProjectNewState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof ProjectDTO;
        value: (typeof state.newProject)[keyof ProjectDTO];
      }>
    ) => {
      (state.newProject as any)[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProject.pending, (state) => {
        state.createState = "loading";
      })
      .addCase(createNewProject.fulfilled, (state) => {
        state.createState = "succeeded";
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.createState = "failed";
        console.log("Error creating project:", action.error.message);
      });
  },
});

export default projectNewSlice.reducer;
export const { updateField } = projectNewSlice.actions;
export { createNewProject };
