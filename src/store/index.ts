import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import jobFilterReducer from "./jobFilterSlice";

const store = configureStore({
  reducer: {
    jobState: jobReducer,
    jobFilterState: jobFilterReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
