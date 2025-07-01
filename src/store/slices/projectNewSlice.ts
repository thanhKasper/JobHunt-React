import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { ProjectApi } from "@/apis/ProjectApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { z } from "zod/v4";
import dayjs from "dayjs";

interface ProjectNewState {
  createState: FetchingState;
  newProject: ProjectDTO;
  errors: Record<keyof ProjectDTO, string>;
}

const projectSchema = z
  .object<ProjectDTO>()
  .extend({
    projectName: z.string().nonempty("Cannot be empty").nonoptional(),
    projectDescription: z
      .string()
      .nonempty("Không được để trống")
      .nonoptional(),
    roles: z.array(z.string()).min(1, "Atleast one role is required"),
    startDate: z.string().nonempty("Không được để trống").nonoptional(),
  })
  .refine(
    (check) =>
      check.endDate
        ? dayjs(check.startDate) < dayjs(check.endDate as string)
        : true,
    { error: "Ngày kết thúc không thể trước ngày bắt đầu", path: ["endDate"] }
  );

const createNewProject = createAsyncThunk(
  "projectNew/createNewProject",
  async (project: ProjectDTO, thunkApi) => {
    const validationResult = projectSchema.safeParse(project);
    if (validationResult.success) {
      return await ProjectApi.createProject(project);
    } else {
      console.log(validationResult.error.issues);
      for (const err of validationResult.error.issues) {
        console.log(err);
        thunkApi.dispatch(
          setProjectError({
            field: err.path[0] as keyof ProjectDTO,
            value: err.message,
          })
        );
      }
    }
  }
);

export const projectNewSlice = createSlice({
  name: "projectNew",
  initialState: {
    createState: "idle",
    errors: {} as Record<keyof ProjectDTO, string>,
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
        value: ProjectDTO[keyof ProjectDTO];
      }>
    ) => {
      (state.newProject as any)[action.payload.field] = action.payload.value;
    },

    setProjectError: (
      state,
      action: PayloadAction<{
        field: keyof ProjectDTO;
        value: string;
      }>
    ) => {
      state.errors[action.payload.field] = action.payload.value;
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
export const { updateField, setProjectError } = projectNewSlice.actions;
export { createNewProject };
