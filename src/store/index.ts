import { configureStore } from "@reduxjs/toolkit";
import jobFilterCreationReducer from "./slices/jobFilterCreateSlice";
import jobFilterDetailReducer from "./slices/jobFilterDetailSlice";
import jobFilterReducer from "./slices/jobFilterSlice";
import jobReducer from "./slices/jobSlice";
import profileReducer from "./slices/profileSlice";
import projectCreationReducer from "./slices/projectNewSlice";
import projectReducer from "./slices/projectSlice";
import authenReducer from "./slices/authenticationSlice";

const store = configureStore({
  reducer: {
    jobState: jobReducer,
    jobFilterState: jobFilterReducer,
    authState: authenReducer,
    jobFilterCreationState: jobFilterCreationReducer,
    jobFilterDetailState: jobFilterDetailReducer,
    projectState: projectReducer,
    projectCreationState: projectCreationReducer,
    profileState: profileReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
