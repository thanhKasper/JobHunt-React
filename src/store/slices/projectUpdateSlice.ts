import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { ProjectApi } from "@/apis/ProjectApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import { logout } from "./authenticationSlice";
import { z } from "zod/v4";
import dayjs from "dayjs";

interface ProjectUpdateState {
  updatedProject: ProjectDTO;
  projectsLoadingState: FetchingState;
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

const editProject = createAsyncThunk(
  "project/editProject",
  async (project: ProjectDTO, thunkApi) => {
    const validateProject = projectSchema.safeParse(project);
    if (validateProject.success) {
      try {
        return await ProjectApi.updateProject(project);
      } catch (err) {
        if ((err as any).status === 452) thunkApi.dispatch(logout());
      }
    } else {
      const error = {} as Record<keyof ProjectDTO, string>;
      for (const err of validateProject.error.issues) {
        error[err.path[0] as keyof ProjectDTO] = err.message;
      }
      return thunkApi.rejectWithValue(error);
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
    errors: {} as Record<keyof ProjectDTO, string>,
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
        state.projectsLoadingState = "idle";
      })
      .addCase(editProject.rejected, (state, action) => {
        state.projectsLoadingState = "failed";
        state.errors = action.payload as Record<keyof ProjectDTO, string>;
      });

    builder.addCase(getProjectDetail.fulfilled, (state, action) => {
      state.projectsLoadingState = "idle";
      state.updatedProject = action.payload as ProjectDTO;
    });
  },
});

export default projectUpdateSlice.reducer;
export const { updateProjectField } = projectUpdateSlice.actions;
export { editProject, getProjectDetail };
