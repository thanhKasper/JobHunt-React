import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchingState } from "./type";
import type { ProfileDTO } from "@/apis/DTO/ProfileDTO";
import { ProfileApi } from "@/apis/ProfileApi";

interface ProfileState {
  isEditing: boolean;
  state: FetchingState;
  errors: Record<keyof ProfileDTO, string[]>;
  profile: ProfileDTO;
  previousProfile: ProfileDTO; // used to restore and the user cancel the update
}

const profile = await ProfileApi.getProfile();

const initialState: ProfileState = {
  isEditing: false,
  state: "idle",
  errors: {} as Record<keyof ProfileDTO, string[]>,
  profile: profile,
  previousProfile: { ...profile, awards: [...profile.awards] }, // Store a copy of the initial profile for restoration
};

const saveChangeProfile = createAsyncThunk(
  "profile/saveChangeProfile",
  async (profile: ProfileDTO) => {
    return await ProfileApi.updateProfile(profile);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileField: (
      state,
      action: PayloadAction<{
        field: keyof ProfileDTO;
        value: string | string[];
      }>
    ) => {
      const { field, value } = action.payload;
      (state as any).profile[field] = value;
      state.isEditing = true;
    },

    restoreProfile: (state) => {
      state.profile = { ...state.previousProfile };
      state.isEditing = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveChangeProfile.pending, (state) => {
        state.state = "loading";
      })
      .addCase(saveChangeProfile.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.previousProfile = { ...state.profile };
        state.profile = action.payload;
        state.isEditing = false;
      })
      .addCase(saveChangeProfile.rejected, (state) => {
        state.state = "failed";
        // Later development
      });
  },
});

export const { updateProfileField, restoreProfile } = profileSlice.actions;
export default profileSlice.reducer;
export { saveChangeProfile };
