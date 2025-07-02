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
import type { AxiosError } from "axios";
import { logout } from "./authenticationSlice";

interface ProjectNewState {
  createState: FetchingState;
  newProject: ProjectDTO;
  errors: Record<keyof ProjectDTO, string>;
}

const projectSchema = z
  .object<ProjectDTO>()
  .extend({
    projectName: z.string().nonempty("Không được để trống").nonoptional(),
    projectDescription: z
      .string()
      .nonempty("Không được để trống")
      .nonoptional(),
    roles: z.array(z.string()).min(1, "Atleast one role is required"),
    startDate: z.date("Không thể để trống"),
    endDate: z.date().nullable(),
  })
  .refine(
    (check) =>
      check.endDate ? dayjs(check.startDate) < dayjs(check.endDate) : true,
    {
      error: "Thời gian kết thúc không thể xảy ra trước thời gian bắt đầu",
      path: ["endDate"],
    }
  );

const createNewProject = createAsyncThunk(
  "projectNew/createNewProject",
  async (project: ProjectDTO, thunkApi) => {
    const validationResult = projectSchema.safeParse(project);
    if (validationResult.success) {
      try {
        return await ProjectApi.createProject(project);
      } catch (err) {
        if ((err as AxiosError).status == 452)
          return thunkApi.dispatch(logout());
      }
    } else {
      const error = {} as Record<keyof ProjectDTO, string>;
      for (const err of validationResult.error.issues) {
        error[err.path[0] as keyof ProjectDTO] = err.message;
      }
      return thunkApi.rejectWithValue(error);
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
      startDate: null,
      endDate: null,
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

    setProjectFormToNormal: (state) => {
      state.createState = "idle";
      state.newProject = {
        endDate: null,
        startDate: null,
        features: [],
        projectDescription: "",
        projectId: "",
        projectName: "",
        roles: [],
        techOrSkills: [],
        liveDemoLink: "",
        projectLink: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProject.pending, (state) => {
        state.createState = "loading";
      })
      .addCase(createNewProject.fulfilled, (state) => {
        state.createState = "idle";
        state.newProject = {
          features: [],
          projectDescription: "",
          projectId: "",
          projectName: "",
          roles: [],
          startDate: null,
          techOrSkills: [],
          endDate: null,
          liveDemoLink: "",
          projectLink: "",
        };
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.createState = "failed";
        state.errors = action.payload as Record<keyof ProjectDTO, string>;
      });
  },
});

export default projectNewSlice.reducer;
export const { updateField, setProjectFormToNormal } = projectNewSlice.actions;
export { createNewProject };
